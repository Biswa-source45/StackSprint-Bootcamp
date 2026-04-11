import React from 'react';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CTA() {
  return (
    <section className="py-20 relative overflow-hidden w-full">
      <div className="absolute inset-0 bg-zinc-900 -z-20"></div>
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-emerald-500/20 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-yellow-500/10 blur-[120px] rounded-full -z-10 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <motion.h2 
          className="text-4xl md:text-5xl font-semibold tracking-tight text-white mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Ready to write your first line?
        </motion.h2>
        <motion.p 
          className="text-lg text-zinc-400 mb-8 max-w-xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Join thousands of developers who have accelerated their careers with StackSprint. Next cohort starts soon.
        </motion.p>
        <motion.a 
          href="#pricing" 
          className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-zinc-900 text-base font-semibold hover:bg-zinc-100 hover:scale-105 transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Claim Your Spot <ArrowRight className="w-4 h-4" />
        </motion.a>
      </div>
    </section>
  );
}
