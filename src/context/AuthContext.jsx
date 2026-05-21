import React, { createContext, useContext, useEffect, useState, useRef } from 'react';
import { auth, db } from '../lib/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import {
  doc,
  getDoc,
  updateDoc,
  onSnapshot
} from 'firebase/firestore';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  // Ref to track if loading has settled — prevents premature signOut during initial hydration
  const isAuthReady = useRef(false);

  const getDeviceInfo = () => ({
    ua: navigator.userAgent,
    platform: navigator.platform,
    vendor: navigator.vendor,
    timestamp: new Date().toISOString()
  });

  const login = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Attempt to read the user document — admin accounts may not have a Firestore
    // document (or rules may be scoped to students only). Treat any read failure
    // as "admin — skip device enforcement" rather than surfacing an error.
    let userDocData = null;
    try {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        userDocData = userDoc.data();
      }
    } catch (err) {
      // Firestore permission denied for this uid → treat as admin, skip enforcement
      console.warn('AuthContext: getDoc failed (likely admin without a users doc):', err.message);
    }

    if (!userDocData || userDocData.role === 'admin') {
      // Admin or doc-less user: skip single-device enforcement
      return user;
    }

    // ── Student single-device enforcement ──────────────────────────────────
    const currentDeviceId =
      localStorage.getItem('deviceId') ||
      Math.random().toString(36).substring(7) + Date.now();

    if (userDocData.isLoggedIn && userDocData.lastDeviceId && userDocData.lastDeviceId !== currentDeviceId) {
      await signOut(auth);
      const deviceName = userDocData.deviceInfo?.ua?.slice(0, 60) || 'another device';
      throw new Error(
        `Already logged in from [${deviceName}]. Logout from that device first, or ask admin to reset.`
      );
    }

    localStorage.setItem('deviceId', currentDeviceId);
    try {
      await updateDoc(doc(db, 'users', user.uid), {
        isLoggedIn: true,
        lastDeviceId: currentDeviceId,
        deviceInfo: getDeviceInfo()
      });
    } catch (err) {
      console.warn('AuthContext: updateDoc failed during login:', err.message);
    }

    return user;
  };

  const logout = async () => {
    if (currentUser && userData?.role !== 'admin') {
      try {
        await updateDoc(doc(db, 'users', currentUser.uid), {
          isLoggedIn: false
        });
      } catch (_) {}
    }
    return signOut(auth);
  };

  // ── Auth state listener ─────────────────────────────────────────────────────
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (!user) {
        setUserData(null);
        setLoading(false);
        isAuthReady.current = true;
      }
      // userData will be set by the Firestore listener below (for students)
      // For admins without a Firestore doc the listener will hit the error handler
      // and we'll fall through gracefully.
    });
    return unsubscribe;
  }, []);

  // ── Firestore real-time user data + session enforcement ─────────────────────
  useEffect(() => {
    if (!currentUser) return;

    const userDocRef = doc(db, 'users', currentUser.uid);
    const unsubDoc = onSnapshot(
      userDocRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);

          // Only enforce single-device policy AFTER auth has fully settled
          // and only for non-admin users
          if (isAuthReady.current && data.role !== 'admin') {
            const currentDeviceId = localStorage.getItem('deviceId');
            if (!data.isLoggedIn || (data.lastDeviceId && data.lastDeviceId !== currentDeviceId)) {
              signOut(auth);
            }
          }
        } else {
          // Document doesn't exist (e.g. admin account with no Firestore doc).
          // Set a minimal userData so role checks work (admin role assumed).
          setUserData({ role: 'admin' });
        }
        setLoading(false);
        isAuthReady.current = true;
      },
      (err) => {
        // Permission denied — most likely an admin whose uid is not in the
        // 'users' collection or the rules block reads. Treat gracefully:
        // set a minimal admin userData and let the app proceed.
        console.warn('AuthContext: Firestore onSnapshot error (treating as admin):', err.message);
        setUserData((prev) => prev ?? { role: 'admin' });
        setLoading(false);
        isAuthReady.current = true;
      }
    );

    return () => unsubDoc();
  }, [currentUser]);

  const value = { currentUser, userData, login, logout, loading };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-zinc-50">
          <div className="flex flex-col items-center gap-4">
            <div className="w-10 h-10 border-4 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
            <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest animate-pulse">
              Initializing Portal
            </p>
          </div>
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
}
