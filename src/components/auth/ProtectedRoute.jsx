import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, role, inverse = false }) {
  const { currentUser, userData, loading, authBusy } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // If inverse is true, we want to hide this route IF user IS logged in
  if (inverse) {
     // authBusy is true while login()/forceLogin() is still validating (e.g. checking
     // for a device conflict) after Firebase Auth has already resolved but before we've
     // decided whether to keep the session. Without this guard, `currentUser` going truthy
     // mid-check redirects away from /login to /dashboard, then bounces straight back once
     // a conflict is found — losing the Login page's own state (e.g. the conflict dialog)
     // in the process. Keep rendering the login form (its own local state drives the
     // submit-button spinner) until the check settles.
     if (currentUser && !authBusy) {
       return <Navigate to="/dashboard" />;
     }
     return children;
  }

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  if (role && userData?.role !== role) {
    // If not authorized for this role, redirect to home or somewhere safe
    return <Navigate to="/" />;
  }

  return children;
}
