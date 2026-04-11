import React from 'react';
import logoImage from '@/assets/Logo_Bootcamp.png';

export function Footer() {
  return (
    <footer className="bg-zinc-50 border-t border-zinc-200 py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2">
            <img 
              src={logoImage} 
              alt="Logo" 
              className="h-6 object-contain" 
            />
            <span className="text-xl font-semibold tracking-tight text-zinc-900">StackSprint</span>
          </div>
          <p className="text-sm text-zinc-500 max-w-sm">The modern, gamified education platform for ambitious developers looking to level up their careers.</p>
          
          <div className="pt-8 border-t border-zinc-100 w-full flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-zinc-500">© 2026 StackSprint. All rights reserved.</p>
            <div className="flex items-center gap-4">
               <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600">Privacy</a>
               <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600">Terms</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
