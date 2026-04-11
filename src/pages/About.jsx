import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Target, 
  Users, 
  Medal, 
  Search, 
  ChevronRight, 
  Home,
  CheckCircle2,
  Cpu,
  Zap,
  Briefcase,
  Star
} from 'lucide-react';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const perks = [
  { icon: Target, title: "100% Practical", desc: "Zero boring theory. Every session is execution-focused." },
  { icon: Cpu, title: "AI-Powered", desc: "Learn to build using ChatGPT, Claude, and Antigravity." },
  { icon: Users, title: "Collaborative", desc: "Open source hackathons and real-world team experience." },
  { icon: Medal, title: "Career Ready", desc: "Resume building, interview prep, and portfolio mastery." }
];

const curriculumData = [
  {
    module: "Module 1: Frontend Architecture",
    desc: "Master the building blocks of the modern web. We go beyond base syntax to teach SEO-optimized HTML, complex CSS layouts, and performance-focused JavaScript.",
    topics: ["Semantic HTML5 & Accessibility", "CSS3 Flexbox/Grid Mastery", "Advanced JavaScript (DOM, ES6+, Web APIs)", "Responsive Design Principles"]
  },
  {
    module: "Module 2: React Ecosystem",
    desc: "Build scalable user interfaces using the world's most popular library. Learn state management, custom hooks, and high-performance component patterns.",
    topics: ["React 19 & Concurrent Mode", "State Management (Zustand/Context)", "Custom Hooks & Logic Reuse", "API Integration & Data Orchestration"]
  },
  {
    module: "Module 3: JavaScript Backend (Node & Express)",
    desc: "Power your apps with industrial-strength backends. Learn server design, middleware logic, and deep security fundamentals.",
    topics: ["Event-Driven Node.js Architecture", "Express Router & Middleware", "JWT & OAuth Security", "Real-time Data with WebSockets"]
  },
  {
    module: "Module 4: Professional Databases",
    desc: "Learn to design data models that scale. We cover both Relational (SQL) and Document-based (NoSQL) databases for complete versatility.",
    topics: ["MongoDB (Mongoose Schema Design)", "MySQL (Complex Joins & Optimization)", "Database Security & ACID", "ORM Integration (Prisma)"]
  },
  {
    module: "Module 5: AI Integration & Agents",
    desc: "Become a 10x developer by leveraging the latest in Generative AI. Learn to integrate LLMs directly into your applications.",
    topics: ["OpenAI API & Vector Databases", "Building AI-Powered Features", "Prompt Engineering for Engineering", "AI Tools Mastery (ChatGPT/Claude)"]
  },
  {
    module: "Module 6: Career & Engineering Tools",
    desc: "The final polish. We ensure you're not just a coder, but a professional engineering candidate ready for hire.",
    topics: ["Git & GitHub Workspace Mastery", "ATS-Friendly Resume Building", "LinkedIn & Personal Branding", "Mock Interviews & Soft Skills"]
  }
];

export function About() {
  useEffect(() => {
    // Fire confetti on page mount for a "wow" start
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-emerald-200 selection:text-emerald-900 overflow-x-hidden w-full relative pt-20">
      {/* Background Decor Layer */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-grid-dashed mask-radial-fade opacity-[0.5]"></div>
        <div className="absolute top-[-10%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-emerald-400/10 blur-[120px]"></div>
        <div className="absolute top-[-10%] right-[-15%] w-[70vw] h-[70vw] rounded-full bg-orange-400/10 blur-[130px]"></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-zinc-500 mb-12">
          <Link to="/" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-zinc-900 font-medium">About</span>
        </nav>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
              <Star className="w-3 h-3 fill-emerald-500" /> Our Mission
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-zinc-900 mb-8 leading-[1.1]">
              From Beginner to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-emerald-400">
                Real-World Developer
              </span>
            </h1>
            <p className="text-lg text-zinc-600 mb-8 leading-relaxed">
              Builders Bootcamp is a 70-day intensive program designed to transform aspiring engineers into interview-ready intermediate fullstack developers. We believe in practical, execution-focused learning—avoiding boring theory to build elite careers.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 shadow-sm">
                <Medal className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-semibold">Job-Ready Skills</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-zinc-200 shadow-sm">
                <Medal className="w-5 h-5 text-emerald-500" />
                <span className="text-sm font-semibold">₹1299 Price Lock</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-square rounded-[3rem] bg-zinc-900 p-8 flex flex-col justify-center relative overflow-hidden group">
               {/* Abstract graphics */}
               <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl animate-pulse" />
               <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
               
               <div className="relative z-10 space-y-6">
                  <div className="text-white">
                    <div className="text-5xl font-bold mb-2">70+</div>
                    <div className="text-zinc-400 font-medium tracking-wide uppercase text-xs">Intensive Days</div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="text-white">
                    <div className="text-5xl font-bold mb-2">10+</div>
                    <div className="text-zinc-400 font-medium tracking-wide uppercase text-xs">Mini Projects</div>
                  </div>
                  <div className="h-px bg-white/10" />
                  <div className="text-white">
                    <div className="text-5xl font-bold mb-2">100%</div>
                    <div className="text-zinc-400 font-medium tracking-wide uppercase text-xs">Practical Work</div>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>

        {/* Why Builders Bootcamp */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why This Program?</h2>
            <p className="text-zinc-600">The core strengths that make us different.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-3xl bg-white border border-zinc-100 shadow-xl shadow-zinc-200/20 hover:border-emerald-500/30 transition-all hover:-translate-y-1 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center mb-6 group-hover:bg-emerald-600 transition-colors">
                  <perk.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-lg mb-3">{perk.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Curriculum Section - Using Shadcn Accordion */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Deep Learning Curve.</h2>
              <p className="text-zinc-600 text-lg">A module-by-module breakdown of everything you'll master during these 70 days.</p>
            </div>
            <div className="flex items-center gap-2 text-sm font-semibold bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full border border-emerald-100 uppercase tracking-tighter">
              <CheckCircle2 className="w-4 h-4" /> 70 Days Path
            </div>
          </div>

          <div className="bg-zinc-50/50 rounded-[2.5rem] border border-zinc-100 p-6 md:p-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {curriculumData.map((mod, i) => (
                <AccordionItem 
                  key={i} 
                  value={`item-${i}`}
                  className="bg-white border border-zinc-200 rounded-2xl px-6 py-2 shadow-sm data-[state=open]:border-emerald-500/30 data-[state=open]:ring-4 data-[state=open]:ring-emerald-500/5 transition-all overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-bold text-lg md:text-xl py-6 hover:no-underline hover:text-emerald-600 transition-colors">
                    {mod.module}
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <div className="grid md:grid-cols-12 gap-8 pt-4 border-t border-zinc-100 mt-2">
                       <div className="md:col-span-8">
                          <p className="text-zinc-600 leading-relaxed text-base mb-6">
                            {mod.desc}
                          </p>
                          <div className="grid sm:grid-cols-2 gap-3">
                            {mod.topics.map((topic, j) => (
                              <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-zinc-50 border border-zinc-100 group hover:bg-emerald-50 hover:border-emerald-100 transition-colors">
                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span className="text-sm text-zinc-700 font-medium">{topic}</span>
                              </div>
                            ))}
                          </div>
                       </div>
                       <div className="md:col-span-4 bg-zinc-50 rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-zinc-100">
                          <Rocket className="w-8 h-8 text-emerald-500 mb-4 animate-bounce" />
                          <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-1">Module Style</div>
                          <div className="text-lg font-bold text-zinc-900 italic">Project-First</div>
                       </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-zinc-900 rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-dashed opacity-10 pointer-events-none" />
          
          <div className="max-w-3xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 italic">Learn to design like a developer, not just code.</h2>
            <div className="grid sm:grid-cols-2 gap-12">
               <div className="space-y-6">
                  <h4 className="flex items-center gap-3 text-emerald-400 font-bold uppercase tracking-wider text-sm">
                    <Zap className="w-4 h-4" /> AI Tools Mastery
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    Boost productivity 10x using ChatGPT for debugging, Claude for deep reasoning, and Antigravity for blazing fast development workflows.
                  </p>
                  <ul className="space-y-3">
                    {["Prompt Engineering", "AI UI Generation", "Logic Optimization"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {item}
                      </li>
                    ))}
                  </ul>
               </div>

               <div className="space-y-6">
                  <h4 className="flex items-center gap-3 text-orange-400 font-bold uppercase tracking-wider text-sm">
                    <Briefcase className="w-4 h-4" /> Professional Skills
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    We don't just teach code. We build careers with Git/GitHub mastery, LinkedIn optimization, and personal branding for developers.
                  </p>
                  <ul className="space-y-3">
                    {["Open Source Hackathons", "ATS Resume Building", "Interview Readiness"].map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-zinc-300 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-orange-500" /> {item}
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>
          
          {/* Action Button */}
          <div className="mt-16 flex justify-center">
             <Link to="/#pricing" className="px-10 py-4 rounded-full bg-white text-zinc-900 font-bold hover:bg-zinc-100 transition-colors shadow-2xl">
                Ready to Join?
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
