import React from 'react';
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-white border-t border-black/10 py-16 font-inter text-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-6">
          <Link to="/" className="text-3xl tracking-tight font-instrument text-black font-normal">
            StackSprint<sup className="text-xs font-sans align-top leading-none font-normal">®</sup>
          </Link>
          <p className="text-sm text-black/70 font-medium max-w-sm leading-relaxed">
            The modern, gamified education platform for ambitious developers looking to level up their careers.
          </p>
          
          <div className="pt-10 border-t border-black/10 w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-black/60 font-medium">© 2026 StackSprint. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-xs text-black/60 hover:text-black font-medium transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-black/60 hover:text-black font-medium transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
