import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function CTA() {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden w-full font-inter bg-black text-white border-t border-black">
      <div className="absolute inset-0 bg-black -z-20"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.span
          className="text-xs font-semibold tracking-widest text-white/60 uppercase mb-3 block"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          START YOUR SPRINT TODAY
        </motion.span>

        <motion.h2 
          className="text-4xl md:text-6xl font-normal tracking-[-1.5px] font-instrument text-white mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to write your first line?
        </motion.h2>

        <motion.p 
          className="text-base sm:text-lg text-white/80 font-medium mb-10 max-w-xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Join thousands of developers who have accelerated their careers with StackSprint. Next cohort starts soon.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link 
            to="/login" 
            className="inline-flex items-center justify-center gap-2 px-10 py-4.5 rounded-full bg-white text-black text-base font-medium hover:bg-zinc-200 hover:scale-[1.03] transition-all duration-300 shadow-xl"
          >
            Claim Your Spot <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
