// Firebase throws opaque "Firebase: Error (auth/xyz)." strings; map the common
// ones to plain language so the login form doesn't surface raw SDK errors.
const AUTH_ERROR_MESSAGES = {
  'auth/invalid-credential': 'Incorrect email or password. Please try again.',
  'auth/wrong-password': 'Incorrect email or password. Please try again.',
  'auth/user-not-found': 'No account found with that email address.',
  'auth/invalid-email': 'Please enter a valid email address.',
  'auth/too-many-requests': 'Too many attempts. Please wait a moment and try again.',
  'auth/network-request-failed': 'Network error — please check your internet connection.',
  'auth/user-disabled': 'This account has been disabled. Please contact an admin.'
};

export function getFriendlyAuthError(err) {
  if (!err) return 'Something went wrong. Please try again.';
  if (err.code && AUTH_ERROR_MESSAGES[err.code]) return AUTH_ERROR_MESSAGES[err.code];
  // Firebase SDK errors carry the code inside err.message too (older SDKs)
  const match = Object.keys(AUTH_ERROR_MESSAGES).find((code) => err.message?.includes(code));
  if (match) return AUTH_ERROR_MESSAGES[match];
  return err.message || 'Something went wrong. Please try again.';
}
