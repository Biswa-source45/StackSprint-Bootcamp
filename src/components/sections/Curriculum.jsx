import React from 'react';
import { Layout, Blocks, Database, Check, Bot } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

export function Curriculum() {
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
    <section id="curriculum" className="py-20 md:py-28 relative z-10 w-full bg-white font-inter">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-14 md:mb-20 text-center max-w-3xl mx-auto">
          <span className="text-xs font-semibold tracking-widest text-black/60 uppercase mb-3 block">
            The Roadmap
          </span>
          <h2 className="text-4xl md:text-6xl font-normal tracking-[-1.5px] font-instrument text-black mb-5">
            Structured for success.
          </h2>
          <p className="text-base text-black/80 font-medium leading-relaxed">
            A modern tech stack curriculum updated monthly to match industry demands. No fluff, just what gets you hired.
          </p>
        </div>

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1: Frontend */}
          <motion.div variants={item} className="h-full">
            <Card className="group relative bg-white overflow-hidden rounded-3xl p-6 md:p-8 border border-black/10 hover:border-black shadow-sm hover:shadow-xl transition-all duration-500 h-full min-h-[360px] flex flex-col justify-start">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"
                alt="JS"
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-5 grayscale transition-all duration-500 group-hover:opacity-20 group-hover:grayscale-0 group-hover:-translate-y-2 group-hover:-translate-x-2 z-0 pointer-events-none"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-500 shrink-0">
                  <Layout className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-normal font-instrument tracking-tight mb-2 text-black">
                  Frontend
                </h3>
                <p className="text-sm text-black/70 leading-relaxed mb-6 flex-grow">
                  Engineer HTML, CSS, Tailwind and deep-dive into core JavaScript fundamentals.
                </p>
                <ul className="space-y-3 shrink-0">
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> Semantic HTML5
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> CSS & Tailwind
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> ES6+ JavaScript
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Card 2: React */}
          <motion.div variants={item} className="h-full">
            <Card className="group relative bg-white overflow-hidden rounded-3xl p-6 md:p-8 border border-black/10 hover:border-black shadow-sm hover:shadow-xl transition-all duration-500 h-full min-h-[360px] flex flex-col justify-start">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"
                alt="React"
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-5 grayscale transition-all duration-500 group-hover:opacity-20 group-hover:grayscale-0 group-hover:-translate-y-2 group-hover:-translate-x-2 z-0 pointer-events-none"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-500 shrink-0">
                  <Blocks className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-normal font-instrument tracking-tight mb-2 text-black">
                  React
                </h3>
                <p className="text-sm text-black/70 leading-relaxed mb-6 flex-grow">
                  Build complex UIs. Learn state management, routing, and high-level hooks.
                </p>
                <ul className="space-y-3 shrink-0">
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> Hooks Expertise
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> Architecture
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> PWA Tech
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Card 3: Backend */}
          <motion.div variants={item} className="h-full">
            <Card className="group relative bg-white overflow-hidden rounded-3xl p-6 md:p-8 border border-black/10 hover:border-black shadow-sm hover:shadow-xl transition-all duration-500 h-full min-h-[360px] flex flex-col justify-start">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg"
                alt="Node.js"
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-5 grayscale transition-all duration-500 group-hover:opacity-20 group-hover:grayscale-0 group-hover:-translate-y-2 group-hover:-translate-x-2 z-0 pointer-events-none"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-500 shrink-0">
                  <Database className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-normal font-instrument tracking-tight mb-2 text-black">
                  Backend
                </h3>
                <p className="text-sm text-black/70 leading-relaxed mb-6 flex-grow">
                  Create robust APIs. Understand SQL & NoSQL databases and security.
                </p>
                <ul className="space-y-3 shrink-0">
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> Node & Express
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> MongoDB
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> JWT Auth
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Card 4: Gen AI */}
          <motion.div variants={item} className="h-full">
            <Card className="group relative bg-white overflow-hidden rounded-3xl p-6 md:p-8 border border-black/10 hover:border-black shadow-sm hover:shadow-xl transition-all duration-500 h-full min-h-[360px] flex flex-col justify-start">
              <img
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
                alt="Gen AI"
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-5 grayscale transition-all duration-500 group-hover:opacity-20 group-hover:grayscale-0 group-hover:-translate-y-2 group-hover:-translate-x-2 z-0 pointer-events-none"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-12 h-12 rounded-2xl bg-black/5 border border-black/10 flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-500 shrink-0">
                  <Bot className="w-5 h-5 text-black group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-2xl font-normal font-instrument tracking-tight mb-2 text-black">
                  Gen AI
                </h3>
                <p className="text-sm text-black/70 leading-relaxed mb-6 flex-grow">
                  Integrate AI capabilities. Work with LLMs and building AI agents.
                </p>
                <ul className="space-y-3 shrink-0">
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> OpenAI/LangChain
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> Prompt Eng.
                  </li>
                  <li className="flex items-center gap-2.5 text-xs sm:text-sm text-black font-medium">
                    <Check className="w-4 h-4 text-black shrink-0" /> Vector DBs
                  </li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
