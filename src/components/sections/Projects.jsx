import React from 'react';
import { motion } from 'framer-motion';

export function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 bg-zinc-50 relative overflow-hidden w-full">
      <div className="max-w-[85rem] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-5">Build a portfolio that stands out.</h2>
            <p className="text-base text-zinc-600">Don't just watch tutorials. Build production-grade applications that solve real problems.</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {/* Project 1 - Coming Soon */}
          <motion.div 
            className="w-full bg-white rounded-[2rem] border border-zinc-200 overflow-hidden group transition-all duration-300"
          >
          <div className="h-64 bg-zinc-50 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/50 to-transparent -translate-x-full animate-shimmer"></div>
            <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
               <span className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Building...</span>
            </div>
          </div>
          <div className="p-8">
            <div className="h-4 w-3/4 bg-zinc-100 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-zinc-100 rounded mb-6"></div>
            <div className="flex gap-2">
              <div className="h-4 w-20 bg-zinc-50 rounded"></div>
              <div className="h-4 w-20 bg-zinc-50 rounded"></div>
            </div>
          </div>
        </motion.div>

        {/* Project 2 - Coming Soon */}
        <motion.div 
          className="w-full bg-white rounded-[2rem] border border-zinc-200 overflow-hidden group transition-all duration-300"
        >
          <div className="h-64 bg-zinc-50 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/50 to-transparent -translate-x-full animate-shimmer"></div>
            <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full animate-spin"></div>
               <span className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Designing...</span>
            </div>
          </div>
          <div className="p-8">
            <div className="h-4 w-3/4 bg-zinc-100 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-zinc-100 rounded mb-6"></div>
            <div className="flex gap-2">
              <div className="h-4 w-20 bg-zinc-50 rounded"></div>
              <div className="h-4 w-20 bg-zinc-50 rounded"></div>
            </div>
          </div>
        </motion.div>

        {/* Project 3 - Coming Soon */}
        <motion.div 
          className="w-full bg-white rounded-[2rem] border border-zinc-200 overflow-hidden group transition-all duration-300"
        >
          <div className="h-64 bg-zinc-50 relative overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-zinc-100/50 to-transparent -translate-x-full animate-shimmer"></div>
            <div className="flex flex-col items-center gap-4">
               <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
               <span className="text-zinc-400 font-mono text-sm tracking-widest uppercase">Coming Soon</span>
            </div>
          </div>
          <div className="p-8">
            <div className="h-4 w-3/4 bg-zinc-100 rounded mb-4"></div>
            <div className="h-4 w-1/2 bg-zinc-100 rounded mb-6"></div>
            <div className="flex gap-2">
              <div className="h-4 w-20 bg-zinc-50 rounded"></div>
              <div className="h-4 w-20 bg-zinc-50 rounded"></div>
            </div>
          </div>
        </motion.div>
      </div>
      </div>
    </section>
  );
}
