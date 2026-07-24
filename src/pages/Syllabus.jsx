import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, ShieldAlert, Award, FileBadge2 } from 'lucide-react';
import certificateImg from '@/assets/Cirtificate.png';
import AetheraNavbar from '../components/layout/AetheraNavbar';
import { Footer } from '../components/layout/Footer';

export function Certificate() {
  return (
    <div className="min-h-screen bg-white text-black font-inter overflow-x-hidden w-full relative">
      {/* Header Navigation */}
      <AetheraNavbar activePage="Certificate" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-black/60 mb-12 font-medium">
          <Link to="/" className="hover:text-black transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-black font-medium">Certification</span>
        </nav>

        {/* Intro Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 text-black text-xs font-semibold tracking-widest uppercase mb-6 border border-black/10">
              <Award className="w-3.5 h-3.5" /> Verified Achievement
            </div>
            <h1 className="text-4xl md:text-6xl font-normal font-instrument tracking-[-1.5px] text-black mb-6">
              Official Certification
            </h1>
            <p className="text-base text-black/80 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Upon successful completion of the 70-day intensive program, you will be awarded an industry-recognized certificate of competence. Stand out to top recruiters by proving your expertise in modern Full-Stack and Gen-AI technologies.
            </p>
            <div className="flex justify-center">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 px-10 py-4.5 rounded-full bg-black text-white text-base font-medium hover:bg-zinc-900 hover:scale-[1.03] shadow-lg transition-all group"
              >
                <FileBadge2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
                View Detailed Curriculum
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Certificate Section with Monochrome Orbiting Border */}
        <motion.div
          className="relative max-w-4xl mx-auto flex items-center justify-center py-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Orbiting Border Container */}
          <div className="relative p-1.5 md:p-2 rounded-2xl overflow-hidden shadow-2xl group bg-black/5">
            {/* Spinning gradient for orbit effect */}
            <div
              className="absolute -inset-[100%] animate-spin origin-center bg-[conic-gradient(from_0deg,transparent_0_340deg,#000000_360deg)] opacity-60"
              style={{ animationDuration: '4s' }}
            />
            <div
              className="absolute -inset-[100%] animate-spin origin-center bg-[conic-gradient(from_180deg,transparent_0_340deg,#52525b_360deg)] opacity-60"
              style={{ animationDuration: '4s' }}
            />

            <div className="absolute inset-1.5 bg-white rounded-xl z-0" />

            {/* Content Container (Certificate + Watermarks) */}
            <div
              className="relative z-10 w-full h-full bg-white rounded-xl overflow-hidden select-none"
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
                  <div key={i} className="flex whitespace-nowrap -rotate-12 -translate-x-1/4 scale-150 transform-gpu" style={{ marginTop: i % 2 === 0 ? '-20px' : '0' }}>
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
                <div className="px-10 py-5 border-[6px] border-black/15 rounded-2xl transform -rotate-12 backdrop-blur-[1px] bg-white/20 shadow-2xl">
                  <span className="text-4xl md:text-7xl font-black text-black/15 tracking-[0.2em] uppercase font-instrument">
                    Sample
                  </span>
                </div>
              </div>

              {/* Security Shield Overlay */}
              <div className="absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 shadow-sm flex items-center gap-2 pointer-events-none">
                <ShieldAlert className="w-4 h-4 text-black" />
                <span className="text-[11px] font-bold text-black/70 uppercase tracking-wider">Protected Document</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
