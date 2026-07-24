import React from 'react';
import { motion } from 'framer-motion';

export function Projects() {
  return (
    <section id="projects" className="py-20 md:py-28 bg-white relative overflow-hidden w-full font-inter">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 md:mb-20">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold tracking-widest text-black/60 uppercase mb-3 block">
              Real-World Projects
            </span>
            <h2 className="text-4xl md:text-6xl font-normal tracking-[-1.5px] font-instrument text-black mb-5">
              Build a portfolio that stands out.
            </h2>
            <p className="text-base text-black/80 font-medium leading-relaxed">
              Don't just watch tutorials. Build production-grade applications that solve real problems.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {/* Project 1 */}
          <motion.div 
            className="w-full bg-white rounded-3xl border border-black/10 hover:border-black overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="h-64 bg-black/[0.02] relative overflow-hidden flex items-center justify-center border-b border-black/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent -translate-x-full animate-shimmer"></div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                <span className="text-black/60 font-mono text-xs tracking-widest uppercase font-medium">Building...</span>
              </div>
            </div>
            <div className="p-8">
              <div className="h-4 w-3/4 bg-black/10 rounded-full mb-4"></div>
              <div className="h-4 w-1/2 bg-black/5 rounded-full mb-6"></div>
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-black/5 border border-black/10 rounded-full"></div>
                <div className="h-6 w-20 bg-black/5 border border-black/10 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Project 2 */}
          <motion.div 
            className="w-full bg-white rounded-3xl border border-black/10 hover:border-black overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="h-64 bg-black/[0.02] relative overflow-hidden flex items-center justify-center border-b border-black/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent -translate-x-full animate-shimmer"></div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                <span className="text-black/60 font-mono text-xs tracking-widest uppercase font-medium">Designing...</span>
              </div>
            </div>
            <div className="p-8">
              <div className="h-4 w-3/4 bg-black/10 rounded-full mb-4"></div>
              <div className="h-4 w-1/2 bg-black/5 rounded-full mb-6"></div>
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-black/5 border border-black/10 rounded-full"></div>
                <div className="h-6 w-20 bg-black/5 border border-black/10 rounded-full"></div>
              </div>
            </div>
          </motion.div>

          {/* Project 3 */}
          <motion.div 
            className="w-full bg-white rounded-3xl border border-black/10 hover:border-black overflow-hidden group shadow-sm hover:shadow-xl transition-all duration-500"
          >
            <div className="h-64 bg-black/[0.02] relative overflow-hidden flex items-center justify-center border-b border-black/5">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/[0.03] to-transparent -translate-x-full animate-shimmer"></div>
              <div className="flex flex-col items-center gap-4">
                <div className="w-10 h-10 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                <span className="text-black/60 font-mono text-xs tracking-widest uppercase font-medium">Coming Soon</span>
              </div>
            </div>
            <div className="p-8">
              <div className="h-4 w-3/4 bg-black/10 rounded-full mb-4"></div>
              <div className="h-4 w-1/2 bg-black/5 rounded-full mb-6"></div>
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-black/5 border border-black/10 rounded-full"></div>
                <div className="h-6 w-20 bg-black/5 border border-black/10 rounded-full"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
