import React from 'react';
import { Flame, Check, Lock, Trophy, Swords } from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  return (
    <section id="features" className="py-16 md:py-24 relative z-10 overflow-hidden w-full">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="relative order-2 lg:order-1">
            {/* Decorative background element */}
            <div className="absolute inset-0 bg-emerald-100 rounded-[3rem] -rotate-3 scale-[1.02] -z-10"></div>
            
            <motion.div 
              className="bg-white rounded-[3rem] p-8 border border-zinc-200 shadow-xl relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between border-b border-zinc-100 pb-5 mb-5">
                <h4 className="text-xl font-semibold text-zinc-900">Your Journey</h4>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
                    <Flame className="w-3.5 h-3.5" /> 14 Day Streak
                  </span>
                </div>
              </div>

              {/* Simulated UI Tasks */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-between group hover:bg-white hover:border-emerald-200 transition-colors cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">Complete API Module</p>
                      <p className="text-xs text-zinc-500 font-medium">+500 XP earned</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-white border border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.1)] flex items-center justify-between relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500"></div>
                  <div className="flex items-center gap-4 pl-2">
                    <div className="w-8 h-8 rounded-full border-2 border-zinc-300 flex items-center justify-center"></div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">Daily Challenge: Array Methods</p>
                      <p className="text-xs text-zinc-500 font-medium">Rewards: Rare Badge</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 bg-zinc-900 text-white rounded-full text-xs font-medium hover:bg-zinc-800 transition-colors">Start</button>
                </div>

                <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-between opacity-70">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-zinc-200 flex items-center justify-center">
                      <Lock className="w-3 h-3 text-zinc-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-zinc-900">Weekend Hackathon</p>
                      <p className="text-xs text-zinc-500 font-medium">Unlocks at Level 10</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-zinc-900 mb-5">Learning that feels like playing.</h2>
            <p className="text-base text-zinc-600 mb-8 leading-relaxed">
              Stay motivated with our gamified learning environment. Earn experience points, collect badges, maintain streaks, and climb the global leaderboard as you complete modules and projects.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-yellow-50 text-yellow-600 flex items-center justify-center shrink-0 border border-yellow-100 mt-1">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-zinc-900 mb-1 tracking-tight">Achievements & Badges</h4>
                  <p className="text-sm text-zinc-600">Showcase your skills with verifiable digital badges for every major technology you conquer.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-100 mt-1">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-zinc-900 mb-1 tracking-tight">Weekly Challenges</h4>
                  <p className="text-sm text-zinc-600">Test your knowledge against peers in timed, real-world coding scenarios to earn bonus XP.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
