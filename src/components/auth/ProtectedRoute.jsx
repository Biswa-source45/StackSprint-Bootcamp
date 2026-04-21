import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function ProtectedRoute({ children, role, inverse = false }) {
  const { currentUser, userData, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  // If inverse is true, we want to hide this route IF user IS logged in
  if (inverse) {
     if (currentUser) {
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
