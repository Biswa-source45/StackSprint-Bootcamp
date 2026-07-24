import React from 'react';
import { Flame, Check, Lock, Trophy, Swords } from 'lucide-react';
import { motion } from 'framer-motion';

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28 bg-white relative z-10 overflow-hidden w-full font-inter border-t border-black/10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Journey Interactive Card */}
          <div className="relative order-2 lg:order-1">
            {/* Decorative background element */}
            <div className="absolute inset-0 bg-black/5 rounded-[3rem] -rotate-3 scale-[1.02] -z-10"></div>
            
            <motion.div 
              className="bg-white rounded-[3rem] p-8 border border-black/10 shadow-2xl relative overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between border-b border-black/10 pb-5 mb-5">
                <h4 className="text-2xl font-normal font-instrument text-black">Your Journey</h4>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1.5 bg-black text-white px-3.5 py-1.5 rounded-full text-xs font-medium shadow-sm">
                    <Flame className="w-3.5 h-3.5" /> 14 Day Streak
                  </span>
                </div>
              </div>

              {/* Simulated UI Tasks */}
              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/10 flex items-center justify-between group hover:bg-white hover:border-black transition-all duration-300 cursor-pointer">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black">Complete API Module</p>
                      <p className="text-xs text-black/60 font-medium">+500 XP earned</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-2xl bg-white border border-black shadow-md flex items-center justify-between relative overflow-hidden">
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-black"></div>
                  <div className="flex items-center gap-4 pl-2">
                    <div className="w-8 h-8 rounded-full border-2 border-black/20 flex items-center justify-center shrink-0"></div>
                    <div>
                      <p className="text-sm font-semibold text-black">Daily Challenge: Array Methods</p>
                      <p className="text-xs text-black/60 font-medium">Rewards: Rare Badge</p>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-black text-white rounded-full text-xs font-medium hover:bg-zinc-800 transition-colors shadow-sm">
                    Start
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-black/[0.02] border border-black/5 flex items-center justify-between opacity-60">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full border-2 border-black/20 flex items-center justify-center shrink-0">
                      <Lock className="w-3.5 h-3.5 text-black/60" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-black">Weekend Hackathon</p>
                      <p className="text-xs text-black/60 font-medium">Unlocks at Level 10</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Features Copy */}
          <motion.div 
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="text-xs font-semibold tracking-widest text-black/60 uppercase mb-3 block">
              Gamified Learning
            </span>
            <h2 className="text-4xl md:text-6xl font-normal tracking-[-1.5px] font-instrument text-black mb-5">
              Learning that feels like playing.
            </h2>
            <p className="text-base text-black/80 font-medium mb-8 leading-relaxed">
              Stay motivated with our gamified learning environment. Earn experience points, collect badges, maintain streaks, and climb the global leaderboard as you complete modules and projects.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-black/5 text-black flex items-center justify-center shrink-0 border border-black/10 mt-1">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-normal font-instrument text-black mb-1">Achievements & Badges</h4>
                  <p className="text-sm text-black/70 font-medium leading-relaxed">Showcase your skills with verifiable digital badges for every major technology you conquer.</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-black/5 text-black flex items-center justify-center shrink-0 border border-black/10 mt-1">
                  <Swords className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xl font-normal font-instrument text-black mb-1">Weekly Challenges</h4>
                  <p className="text-sm text-black/70 font-medium leading-relaxed">Test your knowledge against peers in timed, real-world coding scenarios to earn bonus XP.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
