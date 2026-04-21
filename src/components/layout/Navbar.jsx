import React from 'react';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/Logo_Bootcamp.png';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

export function Navbar() {
  const { currentUser } = useAuth();

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/20 bg-white/40 backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="max-w-[70rem] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src={logoImage} 
            alt="StackSprint Logo" 
            className="h-10 w-10 object-contain -ml-2 -mr-1" 
          />
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent ml-2">StackSprint</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/syllabus" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Certificate</Link>
          <Link to="/about" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">About</Link>
          <Link to="/resources" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Resources</Link>
          <a href="/#pricing" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          {currentUser ? (
            <Link 
              to="/dashboard"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-emerald-200 shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Dashboard
            </Link>
          ) : (
            <Link 
              to="/login"
              className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
            >
              Login
            </Link>
          )}
          
          <a 
            href="https://forms.gle/bwEMzgQVfHyLskQT9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-zinc-900 px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5 hidden sm:block"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </nav>
  );
}
