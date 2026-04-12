import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImage from '@/assets/Logo_Bootcamp.png';

const LoaderObj = ({ theme = 'golden' }) => {
  const isGreen = theme === 'green';
  const c1 = isGreen ? '#10b981' : '#d3a410'; 
  const c2 = isGreen ? '#047857' : '#b7870f'; 
  const c3 = isGreen ? '#a7f3d0' : '#ffe4a1'; 
  const c4 = isGreen ? '#6ee7b7' : '#ccb069'; 
  
  return (
    <div className={`loader-wrapper ${theme} relative w-[130px] h-[130px] flex items-center justify-center`} style={{
      '--accent1': c1,
      '--accent1-transparent': isGreen ? '#10b98100' : '#d3a51000',
      '--accent1-semi': isGreen ? '#10b98154' : '#d3a51054',
      '--accent1-low': isGreen ? '#10b9812e' : '#d3a5102e',
      '--accent1-mid': isGreen ? 'rgba(16, 185, 129, 0.519)' : 'rgba(211, 165, 16, 0.519)'
    }}>
      <style>{`
        @keyframes bounceLoader {
          0%, 100% { transform: translateY(16px); }
          50% { transform: translateY(26px); }
        }
        @keyframes bounceLoader2 {
          0%, 100% { transform: translateY(26px); }
          50% { transform: translateY(36px); }
        }
        @keyframes umbralLoader {
          0% { stop-color: var(--accent1-low); }
          50% { stop-color: var(--accent1-mid); }
          100% { stop-color: var(--accent1-low); }
        }
        @keyframes particlesLoader {
          0%, 100% { transform: translateY(8px); }
          50% { transform: translateY(-2px); }
        }
        .anim-bounce { animation: bounceLoader 4s ease-in-out infinite; }
        .anim-bounce2 { animation: bounceLoader2 4s ease-in-out infinite; animation-delay: 0.5s; }
        .anim-stop { animation: umbralLoader 4s infinite; }
        .anim-particles { animation: particlesLoader 4s ease-in-out infinite; }
      `}</style>
      <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full overflow-visible" viewBox="0 0 200 200">
        <g style={{ order: -1 }}>
          <polygon transform="rotate(45 100 100)" strokeWidth="1" stroke={c1} fill="none" points="70,70 148,50 130,130 50,150" className="anim-bounce"></polygon>
          <polygon transform="rotate(45 100 100)" strokeWidth="1" stroke={c1} fill="none" points="70,70 148,50 130,130 50,150" className="anim-bounce2"></polygon>
          <polygon transform="rotate(45 100 100)" strokeWidth="2" stroke="none" fill="#414750" points="70,70 150,50 130,130 50,150"></polygon>
          <polygon strokeWidth="2" stroke="none" fill={`url(#gradiente-${theme})`} points="100,70 150,100 100,130 50,100"></polygon>
          <defs>
            <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id={`gradiente-${theme}`}>
              <stop style={{ stopColor: '#1e2026', stopOpacity: 1 }} offset="20%"></stop>
              <stop style={{ stopColor: '#414750', stopOpacity: 1 }} offset="60%"></stop>
            </linearGradient>
          </defs>
          <polygon transform="translate(20, 31)" strokeWidth="2" stroke="none" fill={c2} points="80,50 80,75 80,99 40,75"></polygon>
          <polygon transform="translate(20, 31)" strokeWidth="2" stroke="none" fill={`url(#gradiente2-${theme})`} points="40,-40 80,-40 80,99 40,75"></polygon>
          <defs>
            <linearGradient y2="100%" x2="0%" y1="-17%" x1="10%" id={`gradiente2-${theme}`}>
              <stop style={{ stopColor: 'var(--accent1-transparent)', stopOpacity: 1 }} offset="20%"></stop>
              <stop style={{ stopColor: 'var(--accent1-semi)', stopOpacity: 1 }} offset="100%" className="anim-stop"></stop>
            </linearGradient>
          </defs>
          <polygon transform="rotate(180 100 100) translate(20, 20)" strokeWidth="2" stroke="none" fill={c1} points="80,50 80,75 80,99 40,75"></polygon>
          <polygon transform="rotate(0 100 100) translate(60, 20)" strokeWidth="2" stroke="none" fill={`url(#gradiente3-${theme})`} points="40,-40 80,-40 80,85 40,110.2"></polygon>
          <defs>
            <linearGradient y2="100%" x2="10%" y1="0%" x1="0%" id={`gradiente3-${theme}`}>
              <stop style={{ stopColor: 'var(--accent1-transparent)', stopOpacity: 1 }} offset="20%"></stop>
              <stop style={{ stopColor: 'var(--accent1-semi)', stopOpacity: 1 }} offset="100%" className="anim-stop"></stop>
            </linearGradient>
          </defs>
          <polygon transform="rotate(45 100 100) translate(80, 95)" strokeWidth="2" stroke="none" fill={c3} points="5,0 5,5 0,5 0,0" className="anim-particles"></polygon>
          <polygon transform="rotate(45 100 100) translate(80, 55)" strokeWidth="2" stroke="none" fill={c4} points="6,0 6,6 0,6 0,0" className="anim-particles"></polygon>
          <polygon transform="rotate(45 100 100) translate(70, 80)" strokeWidth="2" stroke="none" fill="#fff" points="2,0 2,2 0,2 0,0" className="anim-particles"></polygon>
          <polygon strokeWidth="2" stroke="none" fill="#292d34" points="29.5,99.8 100,142 100,172 29.5,130"></polygon>
          <polygon transform="translate(50, 92)" strokeWidth="2" stroke="none" fill="#1f2127" points="50,50 120.5,8 120.5,35 50,80"></polygon>
        </g>
      </svg>
    </div>
  );
};

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-zinc-50 border-t border-zinc-200 w-full overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-5">Invest in your career.</h2>
          <p className="text-base text-zinc-600">One comprehensive package. No hidden fees. Lifetime access to materials.</p>
        </div>

        <div className="w-full max-w-[280px] sm:max-w-[300px] mx-auto relative group perspective-1000">
          
          {/* Left Card - Bootcamp 2.0 (Golden) */}
          <div className="absolute inset-0 w-full rounded-[2rem] bg-zinc-900 border border-zinc-800 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 
            -translate-x-5 rotate-[-5deg] scale-[0.92] opacity-100 shadow-[0_0_40px_rgba(0,0,0,0.2)]
            group-hover:-translate-x-[25%] group-hover:rotate-[-8deg] group-hover:scale-95 
            md:group-hover:-translate-x-[110%] md:group-hover:rotate-[-6deg] md:group-hover:scale-100
            flex flex-col items-center justify-center p-6 overflow-hidden pointer-events-none group-hover:pointer-events-auto
            before:absolute before:inset-0 before:bg-gradient-to-br before:from-yellow-500/10 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-700">
            <div className="absolute inset-x-0 top-0 h-1 bg-yellow-500 shadow-[0_0_10px_rgba(234,179,8,0.5)]"></div>
            <LoaderObj theme="golden" />
            <h3 className="text-xl font-bold text-white mt-1 text-center relative z-10 tracking-tight">Bootcamp 2.0</h3>
            <span className="text-[10px] font-bold tracking-wider uppercase text-yellow-400 mt-3 bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20 relative z-10 shadow-[0_0_15px_rgba(234,179,8,0.2)]">Coming Soon</span>
          </div>

          {/* Right Card - Bootcamp 3.0 (Green) */}
          <div className="absolute inset-0 w-full rounded-[2rem] bg-zinc-900 border border-zinc-800 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] z-0 
            translate-x-5 rotate-[5deg] scale-[0.92] opacity-100 shadow-[0_0_40px_rgba(0,0,0,0.2)]
            group-hover:translate-x-[25%] group-hover:rotate-[8deg] group-hover:scale-95 
            md:group-hover:translate-x-[110%] md:group-hover:rotate-[6deg] md:group-hover:scale-100
            flex flex-col items-center justify-center p-6 overflow-hidden pointer-events-none group-hover:pointer-events-auto
            before:absolute before:inset-0 before:bg-gradient-to-bl before:from-emerald-500/10 before:to-transparent before:opacity-0 group-hover:before:opacity-100 before:transition-opacity before:duration-700">
            <div className="absolute inset-x-0 top-0 h-1 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
            <LoaderObj theme="green" />
            <h3 className="text-xl font-bold text-white mt-1 text-center relative z-10 tracking-tight">Bootcamp 3.0</h3>
            <span className="text-[10px] font-bold tracking-wider uppercase text-emerald-400 mt-3 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20 relative z-10 shadow-[0_0_15px_rgba(16,185,129,0.2)]">Coming Soon</span>
          </div>

          {/* Main Card */}
          <div className="relative z-10 w-full transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03] group-hover:-translate-y-2">
            {/* Glow effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-yellow-400 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-zinc-900 rounded-[2rem] p-5 md:p-6 overflow-hidden border border-zinc-800 flex flex-col h-full shadow-2xl">
              <div className="absolute top-0 right-0 p-5 opacity-10 pointer-events-none">
                <img src={logoImage} className="w-16 h-16 grayscale filter object-contain" alt="Background Logomark" />
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold text-white tracking-tight">Pro Bootcamp</h3>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider">Popular</span>
              </div>
              
              <div className="mb-4">
                <span className="text-3xl font-semibold tracking-tight text-white flex items-center gap-1">₹1299</span>
                <span className="text-xs text-zinc-400 font-medium">/one-time</span>
              </div>
              
              <p className="text-xs text-zinc-400 mb-4 pb-4 border-b border-zinc-800 leading-relaxed">Everything you need to become a hired full-stack developer in 10 weeks.</p>
              
              <ul className="space-y-2.5 mb-6 flex-grow">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">Complete 70-Day Curriculum</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">10+ Portfolio Projects</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">Gamified Platform Access</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">24/7 AI Code Mentor</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">Resume & Interview Prep</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-zinc-300">Lifetime Material Updates</span>
                </li>
              </ul>
              
              <a 
                href="https://forms.gle/bwEMzgQVfHyLskQT9" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-zinc-900 py-2.5 rounded-full text-sm font-bold shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all duration-300 text-center"
              >
                Enroll Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

