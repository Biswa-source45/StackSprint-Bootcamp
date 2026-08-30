import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// Lazily initialized, memoized across warm invocations of the same function
// instance. FIREBASE_SERVICE_ACCOUNT_KEY holds the full service-account JSON
// (as a string) from the Vercel env vars — never committed, never sent to the
// browser. Only used server-side, inside /api functions.
let app;
function getAdminApp() {
  if (app) return app;
  if (getApps().length) {
    app = getApps()[0];
    return app;
  }
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
  if (!raw) throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY is not configured on the server.');
  const serviceAccount = JSON.parse(raw);
  app = initializeApp({ credential: cert(serviceAccount) });
  return app;
}

export const adminAuth = () => getAuth(getAdminApp());
export const adminDb = () => getFirestore(getAdminApp());
export const isAdminConfigured = () => Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
