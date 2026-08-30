import crypto from 'crypto';
import { adminAuth, adminDb, isAdminConfigured } from './_lib/firebaseAdmin.js';
import { sendMail, emailConfigured } from './_lib/mailer.js';

// Step 1 of the forgot-password flow: email a 6-digit code, store only its
// hash + an expiry + an attempt counter in Firestore (collection is locked to
// `allow read, write: if false` in firestore.rules — only this Admin-SDK-backed
// function can ever touch it). Step 2 lives in reset-password.js.

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes
const RESEND_COOLDOWN_MS = 60 * 1000; // 1 minute between requests for the same email
const GENERIC_OK = { ok: true, message: 'If that email is registered, a reset code has been sent.' };

const hashCode = (code) => crypto.createHash('sha256').update(String(code)).digest('hex');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!isAdminConfigured() || !emailConfigured()) {
    console.error('request-otp: server is not fully configured (admin key or SMTP missing).');
    return res.status(200).json({ ok: false, error: 'Password reset is not available right now.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const email = String(body?.email || '').trim().toLowerCase();
  if (!email || !email.includes('@')) {
    return res.status(400).json({ ok: false, error: 'A valid email address is required.' });
  }

  try {
    const db = adminDb();
    const docRef = db.collection('passwordResets').doc(email);

    // Rate-limit resends — don't spam the same inbox.
    const existing = await docRef.get();
    if (existing.exists) {
      const lastSentAt = existing.data().lastSentAt?.toMillis?.() ?? existing.data().lastSentAt ?? 0;
      const waitLeft = RESEND_COOLDOWN_MS - (Date.now() - lastSentAt);
      if (waitLeft > 0) {
        return res.status(200).json({
          ok: false,
          error: `Please wait ${Math.ceil(waitLeft / 1000)}s before requesting another code.`
        });
      }
    }

    // Never reveal whether the email is actually registered.
    let user;
    try {
      user = await adminAuth().getUserByEmail(email);
    } catch {
      return res.status(200).json(GENERIC_OK);
    }

    const code = String(Math.floor(100000 + Math.random() * 900000));
    const now = Date.now();
    await docRef.set({
      uid: user.uid,
      codeHash: hashCode(code),
      expiresAt: now + OTP_TTL_MS,
      attempts: 0,
      lastSentAt: now
    });

    await sendMail({
      to: email,
      subject: 'Your StackSprint password reset code',
      text: [
        `Your password reset code is: ${code}`,
        '',
        `This code expires in ${OTP_TTL_MS / 60000} minutes.`,
        '',
        "If you didn't request this, you can safely ignore this email."
      ].join('\n')
    });

    return res.status(200).json(GENERIC_OK);
  } catch (err) {
    console.error('request-otp: failed:', err.message);
    return res.status(200).json({ ok: false, error: 'Could not send the reset code. Please try again.' });
  }
}
