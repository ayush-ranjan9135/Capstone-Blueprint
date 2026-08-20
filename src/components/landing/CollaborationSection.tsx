'use client';

import { motion } from 'framer-motion';
import { Users, RefreshCw } from 'lucide-react';

export default function CollaborationSection() {
  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.02] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16">
          
          <div className="lg:w-1/2">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 ring-1 ring-inset ring-emerald-500/20 mb-6">
                <RefreshCw className="w-4 h-4" />
                Live Synchronization
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
                Everyone stays on the same page.
              </h2>
              <p className="text-lg text-gray-400 mb-6 leading-relaxed">
                TaskMatrix uses real-time state synchronization to ensure changes made by one team member are instantly reflected across the entire workspace.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed">
                No more constant refreshing. No more overwriting each other's work. Just seamless, continuous progress.
              </p>
            </motion.div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative h-80 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05]" />
              
              <div className="relative flex items-center justify-center gap-8 md:gap-16 w-full px-8">
                {/* User A */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-purple-500 flex items-center justify-center border-4 border-[#0A0A0A] shadow-[0_0_20px_rgba(168,85,247,0.4)] z-10">
                    <span className="text-white font-bold text-sm">JS</span>
                  </div>
                  <div className="bg-white/10 border border-white/10 px-3 py-1 rounded text-xs text-gray-300">
                    Moved to Done
                  </div>
                </div>

                {/* Connection Line & Database */}
                <div className="flex-1 relative flex items-center justify-center">
                  <div className="absolute w-full h-px bg-white/10" />
                  <motion.div 
                    animate={{ x: [-100, 100], opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="absolute w-16 h-px bg-gradient-to-r from-transparent via-emerald-400 to-transparent" 
                  />
                  <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center z-10 shadow-lg">
                    <span className="text-white font-black text-xl tracking-tighter">TM</span>
                  </div>
                </div>

                {/* User B */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center border-4 border-[#0A0A0A] shadow-[0_0_20px_rgba(99,102,241,0.4)] z-10">
                    <span className="text-white font-bold text-sm">AR</span>
                  </div>
                  <div className="bg-white/10 border border-white/10 px-3 py-1 rounded text-xs text-gray-300">
                    Instantly sees update
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
