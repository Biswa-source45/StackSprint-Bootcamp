import React from 'react';
import { Calendar, Code2, Bot, Briefcase, ArrowRight, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Hero() {
  const words = ["Full-Stack", "Backend.", "Gen-AI"];
  const [currentWordIndex, setCurrentWordIndex] = React.useState(0);
  const [displayedText, setDisplayedText] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      const currentWord = words[currentWordIndex];
      
      if (!isDeleting) {
        if (displayedText.length < currentWord.length) {
          setDisplayedText(currentWord.substring(0, displayedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), 1500); // Pause at end
        }
      } else {
        if (displayedText.length > 0) {
          setDisplayedText(currentWord.substring(0, displayedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 40 : 80); // Slightly faster for smoother feel

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentWordIndex, words]);

  return (
    <section className="relative pt-32 pb-16 md:pt-30 md:pb-24 overflow-hidden flex flex-col items-center text-center">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-50 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-50 rounded-full blur-[120px] opacity-50" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10 flex flex-col items-center text-center w-full">
        {/* News Badge - Fixed for stability */}
        <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full border border-zinc-200 bg-white/80 mb-10 shadow-sm">
  <span className="inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
  <span className="text-[10px] font-bold text-zinc-800 tracking-wider uppercase">
    bootcamp: Starting April 13
  </span>
</div>

        {/* Gamified Badges */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2.5 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {[
            { icon: Calendar, text: "70 Days", color: "text-emerald-500", bg: "bg-white" },
            { icon: Code2, text: "10+ Projects", color: "text-emerald-500", bg: "bg-white" },
            { icon: Bot, text: "Gen AI included", color: "text-yellow-500", bg: "bg-white" },
            { icon: Briefcase, text: "Job Ready", color: "text-emerald-700", bg: "bg-emerald-50", border: "border-emerald-100" }
          ].map((badge, i) => (
            <span 
              key={i} 
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border ${badge.border || 'border-zinc-200'} ${badge.bg} text-sm font-medium shadow-sm hover:shadow-md transition-shadow cursor-default`}
            >
              <badge.icon className={`w-3.5 h-3.5 ${badge.color}`} />
              {badge.text}
            </span>
          ))}
        </motion.div>

        <motion.h1 
          className="text-4xl md:text-6xl lg:text-[4.5rem] font-bold tracking-tight leading-[1.25] text-zinc-900 mb-8 max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Architect <span className="relative inline-block px-4 py-1 mx-1 min-w-[260px] text-zinc-900">
            <span className="relative z-10">{displayedText}</span>
            <span className="relative z-10 text-orange-500 font-light animate-pulse backdrop-blur-none">|</span>
            
            {/* Box Border & Handles */}
            <div className="absolute inset-0 border-2 border-orange-500/40 rounded-sm pointer-events-none">
              {/* Corner Handles */}
              {[
                { pos: "-top-1 -left-1" },
                { pos: "-top-1 -right-1" },
                { pos: "-bottom-1 -left-1" },
                { pos: "-bottom-1 -right-1" },
              ].map((dot, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                  className={`absolute ${dot.pos} w-2 h-2 bg-white border-2 border-orange-500 rounded-full shadow-sm z-30`}
                />
              ))}
            </div>

            {/* Scanning Shimmer */}
            <div className="absolute inset-0 rounded-sm overflow-hidden pointer-events-none">
              <motion.div
                animate={{ left: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-orange-500/5 to-transparent skew-x-12"
              />
            </div>
          </span>
          <br className="hidden md:block" />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400 pb-2">
            Level Up Your Career.
            <div className="absolute -bottom-1 left-0 w-full h-3 bg-emerald-400/20 -z-10 rounded-full blur-sm"></div>
          </span>
        </motion.h1>

        <motion.p 
          className="text-base md:text-sm text-zinc-600 max-w-xl mx-auto mb-10 leading-relaxed font-normal px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          An immersive, gamified bootcamp designed to take you from basics to deploying production-ready applications. Learn by building real-world projects.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <a 
            href="https://forms.gle/bwEMzgQVfHyLskQT9" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-zinc-900 text-white text-base font-bold hover:bg-zinc-800 shadow-xl shadow-zinc-900/20 transition-all group active:scale-95 flex items-center justify-center gap-2"
          >
            Start Your Sprint
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <Link 
            to="/syllabus"
            className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-zinc-900 border border-zinc-200 text-base font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            View Certificate
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
