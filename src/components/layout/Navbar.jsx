import React from 'react';
import { Button } from '@/components/ui/button';
import logoImage from '@/assets/Logo_Bootcamp.png';

import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/20 bg-white/40 backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="max-w-[70rem] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img 
            src={logoImage} 
            alt="StackSprint Logo" 
            className="h-14 w-14 object-contain -ml-2 -mr-1" 
          />
          <span className="text-xl font-semibold tracking-tight">StackSprint</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link to="/syllabus" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Curriculum</Link>
          <a href="/#projects" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Projects</a>
          <a href="/#features" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Features</a>
          <a href="/#pricing" className="text-sm font-medium text-zinc-600 hover:text-emerald-600 transition-colors">Pricing</a>
        </div>

        <div className="flex items-center gap-4">
          <a 
            href="https://forms.gle/bwEMzgQVfHyLskQT9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-gradient-to-b from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-zinc-900 px-5 py-2 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            Enroll Now
          </a>
        </div>
      </div>
    </nav>
  );
}
