// Thin wrapper around the /api/notify-doubt Vercel serverless function.
// Unlike a bare fetch().catch(), this actually inspects the HTTP status and the
// { ok, error } response body — a missing EMAIL_* env var on the server responds
// 200 { ok:false, error:... } (by design, so it never breaks the doubt flow itself),
// which a plain .catch() silently swallows. Callers get a real success/failure
// signal back so they can warn the admin/student instead of failing silently.
export async function sendDoubtEmail(payload) {
  try {
    const res = await fetch('/api/notify-doubt', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      console.warn('sendDoubtEmail: HTTP', res.status);
      return { sent: false, error: `Email service returned HTTP ${res.status}` };
    }
    const data = await res.json().catch(() => ({}));
    if (!data.ok) {
      console.warn('sendDoubtEmail: failed —', data.error || 'unknown error');
      return { sent: false, error: data.error || 'Email service reported a failure.' };
    }
    return { sent: true };
  } catch (err) {
    console.warn('sendDoubtEmail: request failed —', err.message);
    return { sent: false, error: err.message };
  }
}
