'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 lg:pt-28 lg:pb-24 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center mb-6"
          >
            <span className="relative inline-flex items-center gap-2 rounded-full bg-white/[0.03] px-4 py-1.5 text-sm font-medium text-gray-200 ring-1 ring-inset ring-white/10 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)] overflow-hidden group hover:bg-white/[0.08] transition-all duration-300">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_rgba(168,85,247,1)]"></span>
              Built for modern teams
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-[5rem] font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 mb-8 leading-[1.1] pb-2 drop-shadow-sm"
          >
            Turn scattered work into <br className="hidden sm:block" />
            <span className="relative whitespace-nowrap">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-400">
                organized progress.
              </span>
              <span className="absolute inset-0 blur-[40px] bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 opacity-40 z-0" />
            </span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg sm:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            TaskMatrix brings tasks, projects, collaboration, and AI assistance into one focused workspace built for modern engineering and product teams.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              href="/register" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_30px_rgba(147,51,234,0.3)] hover:shadow-[0_0_40px_rgba(147,51,234,0.5)] flex items-center justify-center gap-2 group"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="#product" 
              className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors flex items-center justify-center"
            >
              Explore TaskMatrix
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
          >
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-purple-400" /> Real-time collaboration</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-400" /> AI-assisted workflows</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-purple-400" /> Secure workspaces</span>
          </motion.div>
        </div>
      </div>

      {/* Product Mockup Visual */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-20 mx-auto max-w-6xl px-6 lg:px-8 relative"
      >
        <div className="rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-xl shadow-2xl overflow-hidden flex flex-col relative z-20">
          {/* Mockup Header */}
          <div className="h-12 border-b border-white/5 bg-white/[0.02] flex items-center px-4 gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
              <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
            </div>
            <div className="mx-auto bg-white/5 rounded-md px-3 py-1 text-xs text-gray-500 font-mono w-64 text-center truncate">
              app.taskmatrix.com/dashboard
            </div>
          </div>
          
          {/* Mockup Body */}
          <div className="flex h-[500px]">
            {/* Sidebar */}
            <div className="w-48 border-r border-white/5 bg-black/20 p-4 hidden sm:flex flex-col gap-4">
              <div className="h-6 w-24 bg-white/10 rounded" />
              <div className="space-y-2 mt-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-4 w-full bg-white/5 rounded" />
                ))}
              </div>
            </div>
            {/* Main Content */}
            <div className="flex-1 p-6 flex flex-col gap-6 overflow-hidden">
              <div className="flex justify-between items-center">
                <div className="h-8 w-48 bg-white/10 rounded" />
                <div className="flex gap-2">
                  <div className="h-8 w-8 rounded-full bg-purple-500/20 border border-purple-500/30" />
                  <div className="h-8 w-24 rounded bg-indigo-500/20 border border-indigo-500/30" />
                </div>
              </div>
              
              {/* Kanban Columns */}
              <div className="flex-1 flex gap-4 overflow-hidden relative">
                
                {/* Column 1: To Do */}
                <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col gap-3 relative">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">To Do</span>
                    <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">3</span>
                  </div>
                  
                  {/* Animated Dragging Card */}
                  <motion.div 
                    animate={{ 
                      x: [0, 5, 'calc(100% + 1rem)', 'calc(100% + 1rem)', 0],
                      y: [0, -5, 45, 45, 0],
                      rotate: [0, 2, -1, 0, 0],
                      scale: [1, 1.05, 1.05, 1, 1],
                      boxShadow: [
                        '0px 1px 2px rgba(0,0,0,0.1)',
                        '0px 15px 25px rgba(0,0,0,0.2)',
                        '0px 15px 25px rgba(0,0,0,0.2)',
                        '0px 1px 2px rgba(0,0,0,0.1)',
                        '0px 1px 2px rgba(0,0,0,0.1)',
                      ]
                    }}
                    transition={{ 
                      duration: 4, 
                      repeat: Infinity,
                      times: [0, 0.1, 0.4, 0.8, 1],
                      ease: "easeInOut" 
                    }}
                    className="bg-[#111] border border-white/10 rounded-lg p-3 space-y-2 shadow-lg relative z-30"
                  >
                    <div className="flex justify-between">
                      <div className="h-2 w-12 rounded bg-purple-400/30" />
                    </div>
                    <div className="h-4 w-full bg-white/20 rounded" />
                    <div className="h-4 w-2/3 bg-white/10 rounded" />
                    <div className="flex justify-end pt-2">
                      <div className="h-5 w-5 rounded-full bg-indigo-500/50 border border-indigo-500/20" />
                    </div>
                  </motion.div>

                  {/* Static Card 2 */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2 shadow-sm">
                    <div className="flex justify-between">
                      <div className="h-2 w-12 rounded bg-red-400/30" />
                    </div>
                    <div className="h-4 w-full bg-white/20 rounded" />
                    <div className="h-4 w-1/2 bg-white/10 rounded" />
                  </div>
                  
                  {/* Static Card 3 */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2 shadow-sm">
                    <div className="flex justify-between">
                      <div className="h-2 w-12 rounded bg-yellow-400/30" />
                    </div>
                    <div className="h-4 w-5/6 bg-white/20 rounded" />
                    <div className="h-4 w-3/4 bg-white/10 rounded" />
                  </div>
                </div>

                {/* Column 2: In Progress */}
                <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">In Progress</span>
                    <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">2</span>
                  </div>
                  {/* Static Card */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2 shadow-sm">
                    <div className="flex justify-between">
                      <div className="h-2 w-12 rounded bg-green-400/30" />
                    </div>
                    <div className="h-4 w-full bg-white/20 rounded" />
                    <div className="h-4 w-2/3 bg-white/10 rounded" />
                  </div>
                  {/* Placeholder gap where the animated card will land */}
                  <div className="h-[92px] rounded-lg border border-dashed border-white/10 bg-white/[0.01]" />
                </div>

                {/* Column 3: Done */}
                <div className="flex-1 bg-white/[0.02] rounded-xl border border-white/5 p-4 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-400">Done</span>
                    <span className="text-xs text-gray-600 bg-white/5 px-2 py-0.5 rounded-full">1</span>
                  </div>
                  {/* Static Card */}
                  <div className="bg-white/5 border border-white/10 rounded-lg p-3 space-y-2 shadow-sm opacity-50">
                    <div className="flex justify-between">
                      <div className="h-2 w-12 rounded bg-gray-400/30" />
                    </div>
                    <div className="h-4 w-full bg-white/20 rounded line-through" />
                    <div className="h-4 w-2/3 bg-white/10 rounded" />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
        
        {/* Glow behind mockup */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-purple-500/20 filter blur-[100px] rounded-full pointer-events-none z-0" />
      </motion.div>
    </section>
  );
}
