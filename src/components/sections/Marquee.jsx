import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export function Marquee() {
  const containerRef = useRef(null);
  
  // Track mouse coordinates as percentages (0 to 1) relative to container
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Smooth out the movement
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    
    // Convert to 0-1 range
    mouseX.set((e.clientX - left) / width);
    mouseY.set((e.clientY - top) / height);
  };
  
  const handleMouseLeave = () => {
    // Return to center when mouse leaves
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Convert smooth 0-1 values to percentages for the radial gradient
  const xPercent = useTransform(smoothX, [0, 1], [0, 100]);
  const yPercent = useTransform(smoothY, [0, 1], [0, 100]);
  
  // Interpolate colors based on X position
  // Left (0) -> Emerald theme: rgb(16, 185, 129)
  // Right (1) -> Gold theme: rgb(245, 158, 11)
  const r = useTransform(smoothX, [0, 1], [16, 245]);
  const g = useTransform(smoothX, [0, 1], [185, 158]);
  const b = useTransform(smoothX, [0, 1], [129, 11]);

  const glowBackground = useMotionTemplate`radial-gradient(
    circle 500px at ${xPercent}% ${yPercent}%, 
    rgba(${r}, ${g}, ${b}, 0.35) 0%, 
    rgba(${r}, ${g}, ${b}, 0.1) 40%, 
    transparent 100%
  )`;

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-10 bg-zinc-950 overflow-hidden relative cursor-default group border-t border-zinc-900"
    >
      {/* Background glow that follows cursor and interpolates color */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
        style={{
          background: glowBackground,
        }}
      />
      
      <div className="w-full relative z-10 flex justify-center items-center">
        {/* Large fixed text */}
        <h2 className="text-[15vw] font-black tracking-tighter text-transparent leading-none select-none w-full text-center"
            style={{
              WebkitTextStroke: '2px rgba(255, 255, 255, 0.21)',
            }}
        >
          STACKSPRINT
        </h2>
      </div>
    </section>
  );
}
