import React from 'react';
import { motion } from 'framer-motion';
import { Hammer, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Resources() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden w-full relative flex flex-col items-center justify-center pt-20">
      {/* Background Decor Layer - Matching Home Page UI */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Dashed Grid */}
        <div className="absolute inset-0 bg-grid-dashed mask-radial-fade opacity-[0.5]"></div>
        
        {/* Left Green Ambience */}
        <div className="absolute top-[-10%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-emerald-400/15 blur-[120px]"></div>
        
        {/* Right Golden Ambience */}
        <div className="absolute top-[-10%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-orange-400/15 blur-[130px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center w-full">
        {/* Speeder Loader from Uiverse.io */}
        <div className="loader-container mb-10">
            <div className="loader">
                <span>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </span>
                <div className="base">
                    <span></span>
                    <div className="face"></div>
                </div>
            </div>
            <div className="longfazers">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <motion.h1 
          className="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Compiling Resources
        </motion.h1>
        
        <motion.p 
          className="text-lg text-zinc-600 mb-10 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          We're moving fast! Exclusive course materials, project templates, and advanced deep-dives will be added here once the cohort kicks off on <span className="text-emerald-600 font-bold">April 13</span>.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-zinc-600 text-sm font-medium">
            <Hammer className="w-4 h-4" />
            Under Construction
          </div>
          <div className="flex items-center gap-2 px-4 py-2 bg-zinc-50 border border-zinc-200 rounded-full text-zinc-600 text-sm font-medium">
            <Clock className="w-4 h-4" />
            ETA: April 13, 2026
          </div>
        </motion.div>

        <div className="mt-16">
          <Link to="/" className="text-emerald-600 font-semibold hover:underline flex items-center justify-center gap-2 group transition-all">
            <span className="group-hover:-translate-x-1 transition-transform">←</span> Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
