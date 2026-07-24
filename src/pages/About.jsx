import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Rocket,
  Target,
  Users,
  Medal,
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
import AetheraNavbar from '../components/layout/AetheraNavbar';
import { Footer } from '../components/layout/Footer';

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
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function () {
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
    <div className="min-h-screen bg-white text-black font-inter overflow-x-hidden w-full relative">
      {/* Header Navigation */}
      <AetheraNavbar activePage="About" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-black/60 mb-12 font-medium">
          <Link to="/" className="hover:text-black transition-colors flex items-center gap-1">
            <Home className="w-4 h-4" /> Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-black font-medium">About</span>
        </nav>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/5 text-black text-xs font-semibold tracking-widest uppercase mb-6 border border-black/10">
              <Star className="w-3.5 h-3.5 fill-black" /> Our Mission
            </div>
            <h1 className="text-4xl md:text-6xl font-normal font-instrument tracking-[-1.5px] text-black mb-8 leading-[1.1]">
              From Beginner to <br />
              <span className="italic text-black/75">
                Real-World Developer
              </span>
            </h1>
            <p className="text-base sm:text-lg text-black/80 font-medium mb-8 leading-relaxed">
              Builders Bootcamp is a 70-day intensive program designed to transform aspiring engineers into interview-ready intermediate fullstack developers. We believe in practical, execution-focused learning—avoiding boring theory to build elite careers.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-black/10 shadow-sm">
                <Medal className="w-4 h-4 text-black" />
                <span className="text-sm font-medium text-black">Job-Ready Skills</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-black/10 shadow-sm">
                <Medal className="w-4 h-4 text-black" />
                <span className="text-sm font-medium text-black">₹1299 Price Lock</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="aspect-square rounded-[3rem] bg-black p-8 flex flex-col justify-center relative overflow-hidden shadow-2xl border border-black">
              <div className="relative z-10 space-y-6">
                <div className="text-white">
                  <div className="text-5xl font-normal font-instrument mb-1">70+</div>
                  <div className="text-white/60 font-medium tracking-widest uppercase text-xs">Intensive Days</div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="text-white">
                  <div className="text-5xl font-normal font-instrument mb-1">10+</div>
                  <div className="text-white/60 font-medium tracking-widest uppercase text-xs">Mini Projects</div>
                </div>
                <div className="h-px bg-white/10" />
                <div className="text-white">
                  <div className="text-5xl font-normal font-instrument mb-1">100%</div>
                  <div className="text-white/60 font-medium tracking-widest uppercase text-xs">Practical Work</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Why Builders Bootcamp */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <span className="text-xs font-semibold tracking-widest text-black/60 uppercase mb-3 block">
              CORE STRENGTHS
            </span>
            <h2 className="text-4xl md:text-6xl font-normal tracking-[-1.5px] font-instrument text-black mb-4">
              Why This Program?
            </h2>
            <p className="text-base text-black/80 font-medium">The core principles that make us different.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {perks.map((perk, i) => (
              <motion.div
                key={i}
                className="p-8 rounded-3xl bg-white border border-black/10 shadow-sm hover:border-black hover:shadow-xl transition-all duration-500 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="w-12 h-12 rounded-2xl bg-black/5 text-black flex items-center justify-center mb-6 group-hover:bg-black group-hover:text-white transition-all duration-500">
                  <perk.icon className="w-5 h-5" />
                </div>
                <h3 className="font-instrument text-2xl font-normal mb-2 text-black">{perk.title}</h3>
                <p className="text-sm text-black/70 font-medium leading-relaxed">{perk.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Detailed Curriculum Section */}
        <div className="mb-32">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold tracking-widest text-black/60 uppercase mb-3 block">
                CURRICULUM BREAKDOWN
              </span>
              <h2 className="text-4xl md:text-6xl font-normal tracking-[-1.5px] font-instrument text-black mb-4">
                Deep Learning Curve.
              </h2>
              <p className="text-base text-black/80 font-medium">A module-by-module breakdown of everything you'll master during these 70 days.</p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold bg-black/5 text-black px-4 py-2 rounded-full border border-black/10 uppercase tracking-widest shrink-0">
              <CheckCircle2 className="w-4 h-4 text-black" /> 70 Days Path
            </div>
          </div>

          <div className="bg-black/[0.02] rounded-[2.5rem] border border-black/10 p-6 md:p-10">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {curriculumData.map((mod, i) => (
                <AccordionItem
                  key={i}
                  value={`item-${i}`}
                  className="bg-white border border-black/10 rounded-2xl px-6 py-2 shadow-sm data-[state=open]:border-black transition-all overflow-hidden"
                >
                  <AccordionTrigger className="text-left font-normal font-instrument text-2xl py-6 hover:no-underline text-black transition-colors">
                    {mod.module}
                  </AccordionTrigger>
                  <AccordionContent className="pb-8">
                    <div className="grid md:grid-cols-12 gap-8 pt-4 border-t border-black/10 mt-2">
                      <div className="md:col-span-8">
                        <p className="text-black/70 font-medium leading-relaxed text-base mb-6">
                          {mod.desc}
                        </p>
                        <div className="grid sm:grid-cols-2 gap-3">
                          {mod.topics.map((topic, j) => (
                            <div key={j} className="flex items-center gap-3 p-3 rounded-xl bg-black/[0.02] border border-black/5">
                              <div className="w-1.5 h-1.5 rounded-full bg-black" />
                              <span className="text-xs sm:text-sm text-black font-medium">{topic}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="md:col-span-4 bg-black/[0.03] rounded-2xl p-6 flex flex-col justify-center items-center text-center border border-black/10">
                        <Rocket className="w-8 h-8 text-black mb-3" />
                        <div className="text-[10px] font-bold text-black/60 uppercase tracking-widest mb-1">Module Style</div>
                        <div className="text-lg font-normal font-instrument text-black italic">Project-First</div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="bg-black rounded-[3rem] p-8 md:p-16 text-white relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl relative z-10">
            <h2 className="text-3xl md:text-5xl font-normal font-instrument mb-8 text-white italic">
              Learn to design like a developer, not just code.
            </h2>
            <div className="grid sm:grid-cols-2 gap-12">
              <div className="space-y-6">
                <h4 className="flex items-center gap-3 text-white/80 font-semibold uppercase tracking-widest text-xs">
                  <Zap className="w-4 h-4 text-white" /> AI Tools Mastery
                </h4>
                <p className="text-white/70 text-sm font-medium leading-relaxed">
                  Boost productivity 10x using ChatGPT for debugging, Claude for deep reasoning, and Antigravity for blazing fast development workflows.
                </p>
                <ul className="space-y-3">
                  {["Prompt Engineering", "AI UI Generation", "Logic Optimization"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-white" /> {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-6">
                <h4 className="flex items-center gap-3 text-white/80 font-semibold uppercase tracking-widest text-xs">
                  <Briefcase className="w-4 h-4 text-white" /> Professional Skills
                </h4>
                <p className="text-white/70 text-sm font-medium leading-relaxed">
                  We don't just teach code. We build careers with Git/GitHub mastery, LinkedIn optimization, and personal branding for developers.
                </p>
                <ul className="space-y-3">
                  {["Open Source Hackathons", "ATS Resume Building", "Interview Readiness"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-white/90 text-sm font-medium">
                      <CheckCircle2 className="w-4 h-4 text-white" /> {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-16 flex justify-center">
            <Link to="/login" className="px-10 py-4.5 rounded-full bg-white text-black font-medium hover:bg-zinc-200 hover:scale-[1.03] transition-all shadow-xl inline-block">
              Ready to Join?
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
}
