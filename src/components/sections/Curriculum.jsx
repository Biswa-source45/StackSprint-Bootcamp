import React from 'react';
import { Layout, Blocks, Database, Check, Bot } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { motion } from 'framer-motion';

import { Link } from 'react-router-dom';

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
    <section id="curriculum" className="py-16 md:py-24 relative z-10 w-full">
      <div className="max-w-[85rem] mx-auto px-6">
        <div className="mb-12 md:mb-16 text-center max-w-3xl mx-auto">
          <span className="text-emerald-600 font-semibold tracking-tight text-base mb-3 block uppercase">The Roadmap</span>
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-5">Structured for success.</h2>
          <p className="text-base text-zinc-600">A modern tech stack curriculum updated monthly to match industry demands. No fluff, just what gets you hired.</p>
        </div>

        <motion.div 
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Card 1 */}
          <motion.div variants={item} className="h-full">
            <Card className="group relative bg-white overflow-hidden rounded-3xl p-6 md:p-8 border border-zinc-200 hover:border-emerald-200 shadow-sm transition-all duration-500 h-full min-h-[360px] flex flex-col justify-start">
              {/* Background Stack Icon */}
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" 
                alt="JS" 
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 grayscale blur-[2px] transition-all duration-500 group-hover:opacity-60 group-hover:grayscale-0 group-hover:blur-none group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:drop-shadow-[0_0_20px_rgba(247,223,30,0.4)] z-0"
              />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-11 h-11 rounded-xl bg-zinc-50/80 backdrop-blur-sm border border-zinc-100 flex items-center justify-center mb-5 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-500 shrink-0">
                  <Layout className="w-5 h-5 text-zinc-700 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2 text-zinc-900 group-hover:text-amber-500 transition-colors">Frontend</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6 flex-grow">Engineer HTML, CSS, Tailwind and deep-dive into core JavaScript fundamentals.</p>
                <ul className="space-y-3 shrink-0">
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> Semantic HTML5</li>
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> CSS & Tailwind</li>
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> ES6+ JavaScript</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={item} className="h-full">
            <Card className="group relative bg-white overflow-hidden rounded-3xl p-6 md:p-8 border border-zinc-200 hover:border-emerald-200 shadow-sm transition-all duration-500 h-full min-h-[360px] flex flex-col justify-start">
              {/* Background Stack Icon */}
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" 
                alt="React" 
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 grayscale blur-[2px] transition-all duration-500 group-hover:opacity-60 group-hover:grayscale-0 group-hover:blur-none group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:drop-shadow-[0_0_20px_rgba(97,218,251,0.4)] z-0"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-11 h-11 rounded-xl bg-zinc-50/80 backdrop-blur-sm border border-zinc-100 flex items-center justify-center mb-5 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-500 shrink-0">
                  <Blocks className="w-5 h-5 text-zinc-700 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2 text-zinc-900 group-hover:text-cyan-500 transition-colors">React</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6 flex-grow">Build complex UIs. Learn state management, routing, and high-level hooks.</p>
                <ul className="space-y-3 shrink-0">
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> Hooks Expertise</li>
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> Architecture</li>
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> PWA Tech</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={item} className="h-full">
            <Card className="group relative bg-white overflow-hidden rounded-3xl p-6 md:p-8 border border-zinc-200 hover:border-emerald-200 shadow-sm transition-all duration-500 h-full min-h-[360px] flex flex-col justify-start">
              {/* Background Stack Icon */}
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" 
                alt="Node.js" 
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 grayscale blur-[2px] transition-all duration-500 group-hover:opacity-60 group-hover:grayscale-0 group-hover:blur-none group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:drop-shadow-[0_0_20px_rgba(83,158,67,0.4)] z-0"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-11 h-11 rounded-xl bg-zinc-50/80 backdrop-blur-sm border border-zinc-100 flex items-center justify-center mb-5 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-500 shrink-0">
                  <Database className="w-5 h-5 text-zinc-700 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2 text-zinc-900 group-hover:text-[rgb(83,158,67)] transition-colors">Backend</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6 flex-grow">Create robust APIs. Understand SQL & NoSQL databases and security.</p>
                <ul className="space-y-3 shrink-0">
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> Node & Express</li>
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> MongoDB</li>
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> JWT Auth</li>
                </ul>
              </div>
            </Card>
          </motion.div>

          {/* Card 4 */}
          <motion.div variants={item} className="h-full">
            <Card className="group relative bg-white overflow-hidden rounded-3xl p-6 md:p-8 border border-zinc-200 hover:border-emerald-200 shadow-sm transition-all duration-500 h-full min-h-[360px] flex flex-col justify-start">
              {/* Background Stack Icon */}
              <img 
                src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" 
                alt="Gen AI" 
                className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 grayscale blur-[2px] transition-all duration-500 group-hover:opacity-60 group-hover:grayscale-0 group-hover:blur-none group-hover:-translate-y-2 group-hover:-translate-x-2 group-hover:drop-shadow-[0_0_20px_rgba(55,118,171,0.4)] z-0"
              />

              <div className="relative z-10 flex flex-col h-full">
                <div className="w-11 h-11 rounded-xl bg-zinc-50/80 backdrop-blur-sm border border-zinc-100 flex items-center justify-center mb-5 group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-all duration-500 shrink-0">
                  <Bot className="w-5 h-5 text-zinc-700 group-hover:text-emerald-600 transition-colors" />
                </div>
                <h3 className="text-lg font-semibold tracking-tight mb-2 text-zinc-900 group-hover:text-blue-600 transition-colors">Gen AI</h3>
                <p className="text-sm text-zinc-600 leading-relaxed mb-6 flex-grow">Integrate AI capabilities. Work with LLMs and building AI agents.</p>
                <ul className="space-y-3 shrink-0">
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> OpenAI/LangChain</li>
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> Prompt Eng.</li>
                  <li className="flex items-center gap-2.5 text-[0.8rem] text-zinc-700 font-medium whitespace-nowrap"><Check className="w-4 h-4 text-emerald-500" /> Vector DBs</li>
                </ul>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
