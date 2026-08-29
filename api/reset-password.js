import crypto from 'crypto';
import { adminAuth, adminDb, isAdminConfigured } from './_lib/firebaseAdmin.js';

// Step 2 of the forgot-password flow: verify the code from request-otp.js and,
// if it matches and hasn't expired or been over-attempted, actually change the
// account's password via the Admin SDK (the only way to set a password without
// the user already being signed in — the client SDK can't do this on its own).

const MAX_ATTEMPTS = 5;
const hashCode = (code) => crypto.createHash('sha256').update(String(code)).digest('hex');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!isAdminConfigured()) {
    console.error('reset-password: FIREBASE_SERVICE_ACCOUNT_KEY is not configured.');
    return res.status(200).json({ ok: false, error: 'Password reset is not available right now.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const email = String(body?.email || '').trim().toLowerCase();
  const code = String(body?.code || '').trim();
  const newPassword = String(body?.newPassword || '');

  if (!email || !code) {
    return res.status(400).json({ ok: false, error: 'Email and code are required.' });
  }
  if (newPassword.length < 6) {
    return res.status(400).json({ ok: false, error: 'New password must be at least 6 characters.' });
  }

  try {
    const db = adminDb();
    const docRef = db.collection('passwordResets').doc(email);
    const snap = await docRef.get();

    if (!snap.exists) {
      return res.status(200).json({ ok: false, error: 'No reset code found for this email. Request a new one.' });
    }

    const data = snap.data();

    if (Date.now() > data.expiresAt) {
      await docRef.delete();
      return res.status(200).json({ ok: false, error: 'This code has expired. Request a new one.' });
    }

    if (data.attempts >= MAX_ATTEMPTS) {
      await docRef.delete();
      return res.status(200).json({ ok: false, error: 'Too many incorrect attempts. Request a new code.' });
    }

    if (hashCode(code) !== data.codeHash) {
      await docRef.update({ attempts: data.attempts + 1 });
      const attemptsLeft = MAX_ATTEMPTS - (data.attempts + 1);
      return res.status(200).json({
        ok: false,
        error: attemptsLeft > 0 ? `Incorrect code. ${attemptsLeft} attempt(s) left.` : 'Too many incorrect attempts. Request a new code.'
      });
    }

    await adminAuth().updateUser(data.uid, { password: newPassword });
    await docRef.delete();

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('reset-password: failed:', err.message);
    return res.status(200).json({ ok: false, error: 'Could not reset the password. Please try again.' });
  }
}
