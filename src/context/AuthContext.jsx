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

    const userDoc = await getDoc(doc(db, 'users', user.uid));

    if (userDoc.exists()) {
      const data = userDoc.data();

      if (data.role === 'admin') {
        return user;
      }

      const currentDeviceId =
        localStorage.getItem('deviceId') ||
        Math.random().toString(36).substring(7) + Date.now();

      if (data.isLoggedIn && data.lastDeviceId && data.lastDeviceId !== currentDeviceId) {
        await signOut(auth);
        const deviceName = data.deviceInfo?.ua?.slice(0, 60) || 'another device';
        throw new Error(
          `Already logged in from [${deviceName}]. Logout from that device first, or ask admin to reset.`
        );
      }

      localStorage.setItem('deviceId', currentDeviceId);
      await updateDoc(doc(db, 'users', user.uid), {
        isLoggedIn: true,
        lastDeviceId: currentDeviceId,
        deviceInfo: getDeviceInfo()
      });
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
      // userData will be set by the Firestore listener below
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
          if (isAuthReady.current && data.role !== 'admin') {
            const currentDeviceId = localStorage.getItem('deviceId');
            if (!data.isLoggedIn || (data.lastDeviceId && data.lastDeviceId !== currentDeviceId)) {
              signOut(auth);
            }
          }
        }
        setLoading(false);
        isAuthReady.current = true;
      },
      (err) => {
        console.error('Firestore listener error:', err);
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
