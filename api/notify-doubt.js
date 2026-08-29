import nodemailer from 'nodemailer';

// Vercel Serverless Function — the only "backend" this app has. Sends the two
// doubt-system email notifications (admin gets pinged on a new doubt; the student
// gets pinged on status changes). Kept intentionally simple: this is an internal
// tool for a small bootcamp, not a public API, so the guardrails below (fixed
// admin recipient, whitelisted `type`, length caps) are proportionate — not a
// substitute for real auth, which would need a Firebase Admin service account
// nobody has generated for this project.

const MAX_LEN = 4000;
const clamp = (val) => String(val ?? '').slice(0, MAX_LEN);

function getTransporter() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT) || 587,
    secure: false, // STARTTLS on 587
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

function buildNewDoubtEmail(body) {
  const topic = clamp(body.topic) || '(no topic given)';
  const description = clamp(body.description);
  const preferredTime = clamp(body.preferredTime);
  const contactNumber = clamp(body.contactNumber);
  const studentName = clamp(body.studentName);
  const studentEmail = clamp(body.studentEmail);

  return {
    to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER,
    subject: `New student doubt: ${topic}`,
    text: [
      `${studentName} (${studentEmail}) registered a new doubt.`,
      '',
      `Topic: ${topic}`,
      `Description: ${description}`,
      `Preferred contact time: ${preferredTime}`,
      `Contact number: ${contactNumber}`,
      '',
      'Open the Admin Dashboard → Student Queries tab to respond.'
    ].join('\n')
  };
}

function buildStatusUpdateEmail(body) {
  // Recipient here is the student's own email as loaded from their own doubt
  // record — reasonably scoped for an internal tool (see file header note).
  const to = clamp(body.to);
  if (!to || !to.includes('@')) throw new Error('Missing/invalid recipient for status-update email.');
  return {
    to,
    subject: clamp(body.subject) || 'Update on your doubt',
    text: clamp(body.message) || 'There is an update on a doubt you registered.'
  };
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed' });
  }

  if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.error('notify-doubt: EMAIL_* environment variables are not configured.');
    return res.status(200).json({ ok: false, error: 'Email is not configured on the server.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  body = body || {};

  try {
    let mail;
    if (body.type === 'new-doubt') {
      mail = buildNewDoubtEmail(body);
    } else if (body.type === 'status-update') {
      mail = buildStatusUpdateEmail(body);
    } else {
      return res.status(400).json({ ok: false, error: 'Unknown notification type.' });
    }

    const transporter = getTransporter();
    await transporter.sendMail({
      from: `"StackSprint Bootcamp" <${process.env.EMAIL_USER}>`,
      ...mail
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    // Never throw a raw error to the client — the doubt itself is already saved
    // in Firestore regardless of whether the email side-channel succeeds.
    console.error('notify-doubt: send failed:', err.message);
    return res.status(200).json({ ok: false, error: 'Could not send notification email.' });
  }
}
