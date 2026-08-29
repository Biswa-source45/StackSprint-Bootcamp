// Thin wrappers around the two forgot-password API routes. Both endpoints always
// respond 200 with a { ok, error? } body (never a raw HTTP error) so a network-level
// try/catch here is the only place a request can fail outright.
async function postJson(url, payload) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      return { ok: false, error: data.error || `Request failed (HTTP ${res.status}).` };
    }
    return data;
  } catch (err) {
    return { ok: false, error: err.message || 'Network error — please try again.' };
  }
}

export const requestOtp = (email) => postJson('/api/request-otp', { email });

export const confirmPasswordReset = (email, code, newPassword) =>
  postJson('/api/reset-password', { email, code, newPassword });
