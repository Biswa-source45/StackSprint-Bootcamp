import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';
import logoImage from '@/assets/Logo_Bootcamp.png';

export function Pricing() {
  return (
    <section id="pricing" className="py-16 md:py-24 bg-zinc-50 border-t border-zinc-200 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-5">Invest in your career.</h2>
          <p className="text-base text-zinc-600">One comprehensive package. No hidden fees. Lifetime access to materials.</p>
        </div>

        <div className="max-w-sm mx-auto relative group">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-yellow-400 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          
          <motion.div 
            className="relative bg-zinc-900 rounded-[2rem] p-6 md:p-8 overflow-hidden border border-zinc-800 flex flex-col h-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none">
              <img src={logoImage} className="w-20 h-20 grayscale filter object-contain" alt="Background Logomark" />
            </div>
            
            <div className="flex justify-between items-center mb-5">
              <h3 className="text-lg font-semibold text-white tracking-tight">Pro Bootcamp</h3>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-medium">Most Popular</span>
            </div>
            
            <div className="mb-5">
              <span className="text-4xl font-semibold tracking-tight text-white flex items-center gap-1">₹1299</span>
              <span className="text-sm text-zinc-400 font-medium">/one-time</span>
            </div>
            
            <p className="text-sm text-zinc-400 mb-5 pb-5 border-b border-zinc-800">Everything you need to become a hired full-stack developer in 10 weeks.</p>
            
            <ul className="space-y-3 mb-8 flex-grow">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300">Complete 70-Day Curriculum</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300">10+ Portfolio Projects</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300">Gamified Platform Access</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300">24/7 AI Code Mentor</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300">Resume & Interview Prep</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-sm text-zinc-300">Lifetime Material Updates</span>
              </li>
            </ul>
            
            <a 
              href="https://forms.gle/bwEMzgQVfHyLskQT9" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-300 hover:to-yellow-400 text-zinc-900 py-3 rounded-full text-sm font-semibold shadow-[0_0_20px_rgba(250,204,21,0.2)] hover:shadow-[0_0_30px_rgba(250,204,21,0.4)] transition-all duration-300 text-center"
            >
              Enroll Now
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
