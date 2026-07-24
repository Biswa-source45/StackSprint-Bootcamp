import React from 'react';
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
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section className="py-20 md:py-28 bg-white border-t border-black/10 w-full font-inter">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
          <span className="text-xs font-semibold tracking-widest text-black/60 uppercase mb-3 block">
            Testimonials
          </span>
          <h2 className="text-4xl md:text-6xl font-normal tracking-[-1.5px] font-instrument text-black mb-5">
            Stories yet to be written.
          </h2>
          <p className="text-base text-black/80 font-medium leading-relaxed">
            You are the start of our first batch! Be among the pioneers who will define the success stories of StackSprint.
          </p>
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
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-black/10 hover:border-black shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col relative overflow-hidden">
              <div className="flex gap-1.5 mb-6 opacity-30">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full bg-black/20" />
                ))}
              </div>
              <div className="space-y-3 mb-10 overflow-hidden">
                <div className="h-4 w-full bg-black/10 rounded-full" />
                <div className="h-4 w-5/6 bg-black/10 rounded-full" />
                <div className="h-4 w-4/6 bg-black/5 rounded-full" />
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-black/10 shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-24 bg-black/20 rounded-full" />
                  <div className="h-2.5 w-16 bg-black/10 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skeleton Card 2 */}
          <motion.div variants={item}>
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-black/10 hover:border-black shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col relative overflow-hidden">
              <div className="flex gap-1.5 mb-6 opacity-30">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full bg-black/20" />
                ))}
              </div>
              <div className="space-y-3 mb-10 overflow-hidden">
                <div className="h-4 w-full bg-black/10 rounded-full" />
                <div className="h-4 w-5/6 bg-black/10 rounded-full" />
                <div className="h-4 w-3/6 bg-black/5 rounded-full" />
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-black/10 shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-24 bg-black/20 rounded-full" />
                  <div className="h-2.5 w-16 bg-black/10 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Skeleton Card 3 */}
          <motion.div variants={item}>
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-black/10 hover:border-black shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col relative overflow-hidden">
              <div className="flex gap-1.5 mb-6 opacity-30">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-3.5 h-3.5 rounded-full bg-black/20" />
                ))}
              </div>
              <div className="space-y-3 mb-10 overflow-hidden">
                <div className="h-4 w-full bg-black/10 rounded-full" />
                <div className="h-4 w-full bg-black/10 rounded-full" />
                <div className="h-4 w-3/6 bg-black/5 rounded-full" />
              </div>
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-black/10 shrink-0" />
                <div className="space-y-1.5">
                  <div className="h-3.5 w-24 bg-black/20 rounded-full" />
                  <div className="h-2.5 w-16 bg-black/10 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
