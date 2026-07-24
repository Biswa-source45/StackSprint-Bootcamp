import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export function Marquee() {
  const containerRef = useRef(null);
  
  // Track mouse coordinates relative to container
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };
  
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  const xPercent = useTransform(smoothX, [0, 1], [0, 100]);
  const yPercent = useTransform(smoothY, [0, 1], [0, 100]);

  const glowBackground = useMotionTemplate`radial-gradient(
    circle 500px at ${xPercent}% ${yPercent}%, 
    rgba(255, 255, 255, 0.2) 0%, 
    rgba(255, 255, 255, 0.05) 40%, 
    transparent 100%
  )`;

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-16 bg-black overflow-hidden relative cursor-default group border-t border-black font-inter"
    >
      {/* Background radial glow */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{
          background: glowBackground,
        }}
      />
      
      <div className="w-full relative z-10 flex justify-center items-center">
        {/* Large Instrument Serif Marquee Text */}
        <h2 
          className="text-[14vw] font-instrument font-normal tracking-[-2px] text-transparent leading-none select-none w-full text-center"
          style={{
            WebkitTextStroke: '1px rgba(255, 255, 255, 0.35)',
          }}
        >
          STACKSPRINT®
        </h2>
      </div>
    </section>
  );
}
