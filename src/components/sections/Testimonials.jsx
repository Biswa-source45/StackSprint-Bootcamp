import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function Testimonials() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section className="py-16 md:py-24 bg-white border-t border-zinc-100 w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-5">Stories yet to be written.</h2>
          <p className="text-base text-zinc-600">You are the start of our first batch! Be among the pioneers who will define the success stories of StackSprint.</p>
        </div>
        
        <motion.div 
          className="grid md:grid-cols-3 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Skeleton Card 1 */}
          <motion.div variants={item}>
            <div className="bg-zinc-50 rounded-[2rem] p-6 border border-zinc-100 h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
              <div className="flex gap-1.5 mb-5 opacity-20">
                {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded-full bg-zinc-200"></div>)}
              </div>
              <div className="space-y-4 mb-10 overflow-hidden">
                <div className="h-4 w-full bg-zinc-200/50 rounded"></div>
                <div className="h-4 w-5/6 bg-zinc-200/50 rounded"></div>
                <div className="h-4 w-4/6 bg-zinc-200/50 rounded"></div>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-zinc-200/50"></div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-zinc-200/50 rounded"></div>
                  <div className="h-2 w-16 bg-zinc-200/50 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skeleton Card 2 */}
          <motion.div variants={item}>
            <div className="bg-zinc-50 rounded-[2rem] p-6 border border-zinc-100 h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
              <div className="flex gap-1.5 mb-5 opacity-20">
                {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded-full bg-zinc-200"></div>)}
              </div>
              <div className="space-y-4 mb-10 overflow-hidden">
                <div className="h-4 w-full bg-zinc-200/50 rounded"></div>
                <div className="h-4 w-5/6 bg-zinc-200/50 rounded"></div>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-zinc-200/50"></div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-zinc-200/50 rounded"></div>
                  <div className="h-2 w-16 bg-zinc-200/50 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skeleton Card 3 */}
          <motion.div variants={item}>
            <div className="bg-zinc-50 rounded-[2rem] p-6 border border-zinc-100 h-full flex flex-col relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full animate-shimmer"></div>
              <div className="flex gap-1.5 mb-5 opacity-20">
                {[...Array(5)].map((_, i) => <div key={i} className="w-4 h-4 rounded-full bg-zinc-200"></div>)}
              </div>
              <div className="space-y-4 mb-10 overflow-hidden">
                <div className="h-4 w-full bg-zinc-200/50 rounded"></div>
                <div className="h-4 w-full bg-zinc-200/50 rounded"></div>
                <div className="h-4 w-3/6 bg-zinc-200/50 rounded"></div>
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-zinc-200/50"></div>
                <div className="space-y-2">
                  <div className="h-3 w-24 bg-zinc-200/50 rounded"></div>
                  <div className="h-2 w-16 bg-zinc-200/50 rounded"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
