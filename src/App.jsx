import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';

import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { Toaster } from '@/components/ui/sonner';

import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { Stats } from './components/sections/Stats';
import { Curriculum } from './components/sections/Curriculum';
import { Projects } from './components/sections/Projects';
import { Features } from './components/sections/Features';
import { Pricing } from './components/sections/Pricing';
import { Testimonials } from './components/sections/Testimonials';
import { Marquee } from './components/sections/Marquee';
import { CTA } from './components/sections/CTA';
import { Certificate } from './pages/Syllabus';
import { Resources } from './pages/Resources';
import { About } from './pages/About';

import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import RegisterAdmin from './pages/RegisterAdmin';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

// Home: only redirect AFTER auth has settled. Avoids flicker.
function Home() {
  const { currentUser, loading } = useAuth();

  // Don't redirect until we know for certain if user is logged in
  if (loading) return null;
  if (currentUser) return <Navigate to="/dashboard" replace />;

  return (
    <>
      <Hero />
      <Stats />
      <Curriculum />
      <Projects />
      <Features />
      <Pricing />
      <CTA />
      <Testimonials />
      <Marquee />
    </>
  );
}

// Decide which dashboard to show based on role
function DashboardRedirect() {
  const { userData, loading } = useAuth();

  // Wait for userData to resolve; ProtectedRoute already guards against no currentUser
  if (loading || !userData) return null;
  if (userData.role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/student" replace />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <ScrollToTop />
        <div className="bg-white text-zinc-900 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden w-full text-[15px] relative min-h-screen font-sans">
          {/* Background Decor Layer */}
          <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            <div className="absolute inset-0 bg-grid-dashed mask-radial-fade opacity-[0.5]" />
            <div className="absolute top-[-10%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-emerald-400/15 blur-[120px]" />
            <div className="absolute top-[-5%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-orange-400/15 blur-[130px]" />
          </div>

          {/* Main Content */}
          <div className="relative z-10 antialiased">
            <Navbar />
            <main className="w-full">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/syllabus" element={<Certificate />} />
                <Route
                  path="/resources"
                  element={
                    <ProtectedRoute>
                      <Resources />
                    </ProtectedRoute>
                  }
                />
                <Route path="/about" element={<About />} />
                <Route
                  path="/login"
                  element={
                    <ProtectedRoute inverse>
                      <Login />
                    </ProtectedRoute>
                  }
                />
                <Route path="/register-admin" element={<RegisterAdmin />} />

                {/* Dashboard router */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <DashboardRedirect />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute role="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route
                  path="/student"
                  element={
                    <ProtectedRoute role="student">
                      <StudentDashboard />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </main>

            <Footer />
            <Toaster richColors position="top-right" />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
