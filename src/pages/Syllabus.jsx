import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  Code2, 
  Database, 
  Globe, 
  Cpu, 
  ChevronDown, 
  CheckCircle2, 
  ArrowLeft,
  TrendingUp,
  Target
} from 'lucide-react';
import { Link } from 'react-router-dom';

const modules = [
  {
    title: "Module 1: Modern Foundations",
    icon: Globe,
    color: "from-blue-500 to-cyan-400",
    topics: [
      "Advanced HTML5 & Semantic Web",
      "CSS3 Mastery: Flexbox, Grid, and Animations",
      "Tailwind CSS 4.0 Core & Best Practices",
      "JavaScript ES6-ES11+ deep dive",
      "Asynchronous JS & API Integration",
      "DOM Manipulation & Event Loop Architecture"
    ]
  },
  {
    title: "Module 2: Frontend Engineering",
    icon: Code2,
    color: "from-emerald-500 to-teal-400",
    topics: [
      "React 19 Core Fundamentals",
      "Advanced Hooks (useDynamic, useTransition)",
      "State Management: Zustand & Context API",
      "Next.js App Router & Server Components",
      "Framer Motion for High-End Interactivity",
      "Performance Optimization & Code Splitting"
    ]
  },
  {
    title: "Module 3: Full-Stack Backend",
    icon: Cpu,
    color: "from-orange-500 to-amber-400",
    topics: [
      "Node.js Runtime & Event-Driven Architecture",
      "Express.js Middleware & Router Design",
      "MongoDB: Schema Design & Aggregation Pipelines",
      "JWT Authentication & Session Management",
      "Real-time Comm with Socket.io",
      "RESTful API & GraphQL Principles"
    ]
  },
  {
    title: "Module 4: Professional Databases",
    icon: Database,
    color: "from-purple-500 to-indigo-400",
    topics: [
      "MySQL & Relational Data Modeling",
      "Complex SQL Joins & Subqueries",
      "Indexing Strategies for Performance",
      "Database Security & ACID Compliance",
      "Prisma ORM Integration",
      "NoSQL vs SQL specialized use cases"
    ]
  },
  {
    title: "Module 5: Gen AI & Modern Tech",
    icon: Target,
    color: "from-pink-500 to-rose-400",
    topics: [
      "OpenAI API & LangChain Integration",
      "Vector Databases (Pinecone/Vectorize)",
      "Prompt Engineering for Developers",
      "Building AI Agents with Python & Node",
      "Deployment with Docker & Vercel",
      "CI/CD Pipelines & Cloud Basics"
    ]
  }
];

export function Syllabus() {
  const [openModule, setOpenModule] = useState(0);

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200 overflow-x-hidden relative">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] rounded-full bg-emerald-500/5 blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[80vw] h-[80vw] rounded-full bg-blue-500/5 blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-150 contrast-150" />
      </div>

      {/* Floating Particles (Simulated) */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-20"
            animate={{
              y: [0, -1000],
              x: Math.random() * 100 - 50,
              opacity: [0, 0.4, 0]
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 20
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: '100%'
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <Link to="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        <div className="grid lg:grid-cols-12 gap-12">
          {/* Main Content: Syllabus */}
          <div className="lg:col-span-7">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
              Detailed Curriculum
            </h1>
            <p className="text-zinc-400 text-lg mb-12 max-w-2xl">
              10 weeks of intensive, project-based learning. Each module is designed to give you production-ready skills and a professional portfolio.
            </p>

            <div className="space-y-4">
              {modules.map((mod, i) => (
                <div 
                  key={i}
                  className={`group rounded-2xl border transition-all duration-300 overflow-hidden ${
                    openModule === i 
                      ? 'bg-zinc-900/50 border-zinc-700 shadow-2xl shadow-emerald-500/5' 
                      : 'bg-zinc-900/20 border-zinc-800/50 hover:border-zinc-700'
                  }`}
                >
                  <button 
                    onClick={() => setOpenModule(openModule === i ? -1 : i)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${mod.color} p-2.5 flex items-center justify-center shrink-0 shadow-lg shadow-black/20`}>
                        <mod.icon className="w-full h-full text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-zinc-200 group-hover:text-white transition-colors">
                        {mod.title}
                      </h3>
                    </div>
                    <ChevronDown className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${openModule === i ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {openModule === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 pt-2">
                          <div className="grid sm:grid-cols-2 gap-3">
                            {mod.topics.map((topic, j) => (
                              <div key={j} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 border border-white/5 group/topic hover:bg-white/10 transition-colors">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                                <span className="text-sm text-zinc-400 group-hover/topic:text-zinc-200 transition-colors line-height-relaxed">{topic}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Analytics & Market Demand */}
          <div className="lg:col-span-5 space-y-8">
            {/* Market Demand Card */}
            <div className="rounded-3xl p-8 bg-zinc-900/40 border border-white/5 backdrop-blur-xl relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Market Demand</h4>
                    <p className="text-xs text-zinc-500">Industry readiness score</p>
                  </div>
                </div>

                <div className="space-y-6">
                  {[
                    { label: "React Mastery", val: 95, color: "bg-emerald-500" },
                    { label: "Node.js Architecture", val: 88, color: "bg-blue-500" },
                    { label: "AI Integration", val: 92, color: "bg-purple-500" },
                  ].map((stat, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">{stat.label}</span>
                        <span className="text-white font-medium">{stat.val}%</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full ${stat.color} rounded-full`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${stat.val}%` }}
                          transition={{ duration: 1, delay: i * 0.2 }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-3xl rounded-full translate-x-10 -translate-y-10" />
            </div>

            {/* Project Density Indicator */}
            <div className="rounded-3xl p-8 bg-zinc-900/40 border border-white/5 backdrop-blur-xl">
               <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-orange-400" />
                </div>
                <h4 className="font-semibold text-white">Project Density</h4>
              </div>
              <div className="flex flex-col items-center justify-center py-4">
                <div className="relative w-32 h-32 flex items-center justify-center">
                   <svg className="w-full h-full -rotate-90">
                      <circle 
                        cx="64" cy="64" r="58" 
                        className="stroke-zinc-800"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle 
                        cx="64" cy="64" r="58" 
                        className="stroke-emerald-500"
                        strokeWidth="8"
                        strokeLinecap="round"
                        fill="none"
                        initial={{ strokeDasharray: "0, 360" }}
                        animate={{ strokeDasharray: "310, 360" }}
                        transition={{ duration: 2 }}
                      />
                   </svg>
                   <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-white">85%</span>
                      <span className="text-[10px] text-zinc-500 uppercase font-medium">Practical</span>
                   </div>
                </div>
                <p className="text-sm text-zinc-400 mt-6 text-center">
                  Less theoretical lectures, more actual building. Over 400 hours of coding.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
