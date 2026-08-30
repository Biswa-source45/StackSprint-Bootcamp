import nodemailer from 'nodemailer';

// Shared SMTP transport, used by every /api function that sends mail.
// `_lib` is excluded from Vercel's file-based API routing (leading underscore).
export function getTransporter() {
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

export function emailConfigured() {
  return Boolean(process.env.EMAIL_HOST && process.env.EMAIL_USER && process.env.EMAIL_PASS);
}

export async function sendMail(mail) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"StackSprint Bootcamp" <${process.env.EMAIL_USER}>`,
    ...mail
  });
}
