import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, ShieldAlert, Award, FileBadge2 } from 'lucide-react';
import certificateImg from '@/assets/Cirtificate.png';

export function Syllabus() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden w-full relative pt-20">
      {/* Background Decor Layer - Matching Home Page UI */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dashed Grid */}
        <div className="absolute inset-0 bg-grid-dashed mask-radial-fade opacity-[0.5]"></div>
        
        {/* Left Green Ambience */}
        <div className="absolute top-[-10%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-emerald-400/15 blur-[120px]"></div>
        
        {/* Right Golden Ambience */}
        <div className="absolute top-[-10%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-orange-400/15 blur-[130px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-12">
          <Link to="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-900 font-medium">Certification</span>
        </nav>

        {/* Intro Section  */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6 border border-emerald-100">
              <Award className="w-3.5 h-3.5" /> Verified Achievement
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6">
              Official Certification
            </h1>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              Upon successful completion of the 70-day intensive program, you will be awarded an industry-recognized certificate of competence. Stand out to top recruiters by proving your expertise in modern Full-Stack and Gen-AI technologies.
            </p>
            <div className="flex justify-center">
              <Link 
                to="/about"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-900 text-white text-base font-semibold hover:bg-zinc-800 shadow-xl shadow-zinc-900/20 transition-all active:scale-95 group"
              >
                <FileBadge2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                View Detailed Curriculum
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Certificate Section with Orbiting Border */}
        <motion.div 
          className="relative max-w-4xl mx-auto flex items-center justify-center py-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          
          {/* Orbiting Border Container */}
          <div className="relative p-1.5 md:p-2 rounded-xl overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.15)] group bg-zinc-100/50">
            {/* Spinning gradient for orbit effect */}
            <div 
              className="absolute -inset-[100%] animate-spin origin-center bg-[conic-gradient(from_0deg,transparent_0_340deg,#10b981_360deg)] opacity-70" 
              style={{ animationDuration: '4s' }} 
            />
            <div 
              className="absolute -inset-[100%] animate-spin origin-center bg-[conic-gradient(from_180deg,transparent_0_340deg,#f59e0b_360deg)] opacity-70" 
              style={{ animationDuration: '4s' }} 
            />
            
            <div className="absolute inset-1.5 bg-white rounded-lg z-0" />

            {/* Content Container (Certificate + Watermarks) */}
            <div 
              className="relative z-10 w-full h-full bg-white rounded-lg overflow-hidden select-none"
              onContextMenu={(e) => e.preventDefault()}
            >
              <img 
                src={certificateImg} 
                alt="Bootcamp Certificate Sample" 
                className="w-full h-auto object-cover pointer-events-none select-none"
                draggable="false"
              />

              {/* Advanced Pattern Watermark */}
              <div className="absolute inset-0 pointer-events-none flex flex-col justify-between overflow-hidden opacity-[0.03] select-none mix-blend-multiply">
                {[...Array(15)].map((_, i) => (
                  <div key={i} className="flex whitespace-nowrap -rotate-12 -translate-x-1/4 scale-150 transform-gpu" style={{ marginTop: i%2 === 0 ? '-20px' : '0' }}>
                    {[...Array(10)].map((_, j) => (
                      <span key={j} className="text-3xl font-black px-4 tracking-widest text-black/50">
                        SAMPLE • UNOFFICIAL • 
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              {/* Central Large Watermark */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                 <div className="px-10 py-5 border-[6px] border-zinc-900/15 rounded-2xl transform -rotate-12 backdrop-blur-[1px] bg-white/20 shadow-2xl">
                   <span className="text-4xl md:text-7xl font-black text-zinc-900/15 tracking-[0.2em] uppercase">
                     Sample
                   </span>
                 </div>
              </div>

              {/* Security Shield Overlay */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-zinc-200 shadow-sm flex items-center gap-2 pointer-events-none">
                <ShieldAlert className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-bold text-zinc-600 uppercase tracking-wider">Protected Document</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
