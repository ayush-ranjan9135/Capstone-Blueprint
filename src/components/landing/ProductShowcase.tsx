'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: 'Kanban Board',
      description: 'Visualize your entire workflow with drag-and-drop ease. Quickly move tasks across statuses as work progresses.',
    },
    {
      title: 'Project Dashboard',
      description: 'Get a high-level overview of project health, recent activity, and team member workloads.',
    },
    {
      title: 'AI Task Breakdown',
      description: 'Instantly convert complex epics into actionable checklists with a single click using Gemini AI.',
    },
  ];

  return (
    <section id="product" className="py-24 relative overflow-hidden bg-[#0A0A0A] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
          >
            A closer look at TaskMatrix
          </motion.h2>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 items-center">
          {/* Tab Selection */}
          <div className="lg:w-1/3 flex flex-col gap-4">
            {tabs.map((tab, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`text-left p-6 rounded-2xl transition-all duration-300 border ${
                  activeTab === i 
                    ? 'bg-white/10 border-white/20 shadow-lg' 
                    : 'bg-transparent border-transparent hover:bg-white/5'
                }`}
              >
                <h3 className={`text-xl font-bold mb-2 ${activeTab === i ? 'text-white' : 'text-gray-400'}`}>
                  {tab.title}
                </h3>
                <p className={`text-sm leading-relaxed ${activeTab === i ? 'text-gray-300' : 'text-gray-500'}`}>
                  {tab.description}
                </p>
              </button>
            ))}
          </div>

          {/* Visual Showcase (CSS mockups) */}
          <div className="lg:w-2/3 w-full h-[400px] lg:h-[500px] relative bg-black/40 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.03]" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 p-8 flex items-center justify-center"
              >
                {activeTab === 0 && (
                  <div className="w-full h-full flex gap-4 relative">
                    {/* Animated Dragging Card */}
                    <motion.div 
                      animate={{ 
                        x: [0, 5, 'calc(100% + 1rem)', 'calc(100% + 1rem)', 'calc(200% + 2rem)', 'calc(200% + 2rem)', 0],
                        y: [0, -5, 50, 50, 0, 0, 0],
                        rotate: [0, 3, -2, 0, 2, 0, 0],
                        scale: [1, 1.05, 1.05, 1, 1.05, 1, 1],
                        boxShadow: [
                          '0px 1px 2px rgba(0,0,0,0.1)',
                          '0px 15px 25px rgba(0,0,0,0.3)',
                          '0px 15px 25px rgba(0,0,0,0.3)',
                          '0px 1px 2px rgba(0,0,0,0.1)',
                          '0px 15px 25px rgba(0,0,0,0.3)',
                          '0px 1px 2px rgba(0,0,0,0.1)',
                          '0px 1px 2px rgba(0,0,0,0.1)',
                        ]
                      }}
                      transition={{ 
                        duration: 6, 
                        repeat: Infinity,
                        times: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
                        ease: "easeInOut" 
                      }}
                      className="absolute top-[48px] left-4 w-[calc(33.333%-1.5rem)] bg-[#111] p-3 rounded-lg border border-purple-500/30 space-y-2 shadow-lg z-30"
                    >
                      <div className="w-10 h-1.5 rounded-full bg-purple-500/80" />
                      <div className="w-full h-3 bg-white/30 rounded" />
                      <div className="w-2/3 h-3 bg-white/20 rounded" />
                    </motion.div>

                    {['To Do', 'In Progress', 'Review'].map((col, idx) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.15, duration: 0.5, type: 'spring' }}
                        className="flex-1 bg-white/5 rounded-xl p-4 border border-white/5 flex flex-col gap-3 relative"
                      >
                        <div className="font-medium text-gray-300 text-sm">{col}</div>
                        {/* Placeholder for the animated card in column 1 */}
                        {idx === 0 && (
                          <div className="h-[74px] rounded-lg border border-dashed border-white/10 bg-white/[0.01]" />
                        )}
                        {[...Array(idx === 1 ? 2 : 1)].map((_, j) => (
                          <motion.div 
                            key={j} 
                            whileHover={{ scale: 1.02, y: -2 }}
                            className="bg-[#111] p-3 rounded-lg border border-white/10 space-y-2 shadow cursor-pointer transition-all"
                          >
                            <div className={`w-10 h-1.5 rounded-full ${idx === 0 ? 'bg-purple-500/50' : 'bg-indigo-500/50'}`} />
                            <div className="w-full h-3 bg-white/20 rounded" />
                            <div className="w-2/3 h-3 bg-white/10 rounded" />
                          </motion.div>
                        ))}
                      </motion.div>
                    ))}
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="w-full h-full flex flex-col gap-4">
                    <div className="flex gap-4">
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.1, duration: 0.4 }}
                        className="flex-1 h-24 bg-purple-500/10 border border-purple-500/20 rounded-xl p-4"
                      >
                        <div className="text-purple-400 text-sm">Active Projects</div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.4 }}
                          className="text-3xl font-bold text-white mt-1"
                        >
                          4
                        </motion.div>
                      </motion.div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.4 }}
                        className="flex-1 h-24 bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4"
                      >
                        <div className="text-indigo-400 text-sm">Tasks Completed</div>
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="text-3xl font-bold text-white mt-1"
                        >
                          128
                        </motion.div>
                      </motion.div>
                    </div>
                    <div className="flex-1 bg-white/5 border border-white/5 rounded-xl p-4 flex flex-col justify-end overflow-hidden relative">
                       <div className="absolute inset-0 bg-gradient-to-t from-indigo-500/5 to-transparent pointer-events-none" />
                       <div className="flex items-end justify-between h-3/4 gap-2 relative z-10">
                         {[40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                           <motion.div 
                             key={i} 
                             initial={{ height: 0 }}
                             animate={{ height: `${h}%` }}
                             transition={{ duration: 0.6, delay: 0.3 + (i * 0.05), ease: "easeOut" }}
                             className="w-full bg-indigo-500/40 hover:bg-indigo-400/60 rounded-t-sm transition-colors cursor-pointer relative group"
                           >
                              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {h * 10}
                              </div>
                           </motion.div>
                         ))}
                       </div>
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
                  <div className="w-full max-w-md bg-[#111] rounded-xl border border-white/10 shadow-2xl p-6">
                    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/5">
                      <motion.div 
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ repeat: Infinity, duration: 4 }}
                        className="w-8 h-8 rounded bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center relative overflow-hidden"
                      >
                        <motion.div 
                          animate={{ x: ['-100%', '200%'] }}
                          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                          className="absolute inset-0 w-full bg-white/20 skew-x-12"
                        />
                        <span className="text-white text-xs font-bold relative z-10">AI</span>
                      </motion.div>
                      <span className="text-white font-medium">Task breakdown generated</span>
                    </div>
                    <div className="space-y-3">
                      {[1, 2, 3].map((i) => (
                        <motion.div 
                          key={i} 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.2 }}
                          className="flex items-start gap-3"
                        >
                          <motion.div 
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: (i * 0.2) + 0.2, type: 'spring' }}
                            className="w-4 h-4 rounded border border-indigo-500/50 mt-0.5 flex items-center justify-center bg-indigo-500/10" 
                          />
                          <div className="flex-1 h-5 bg-white/10 rounded relative overflow-hidden">
                            <motion.div 
                              animate={{ x: ['-100%', '200%'] }}
                              transition={{ repeat: Infinity, duration: 2.5, delay: i * 0.3 }}
                              className="absolute inset-0 w-1/3 bg-white/5 skew-x-12"
                            />
                          </div>
                        </motion.div>
                      ))}
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 }}
                        whileHover={{ scale: 1.05 }}
                        className="w-1/2 h-8 bg-indigo-500 text-white rounded flex items-center justify-center text-xs font-medium mt-6 shadow-lg shadow-indigo-500/20 cursor-pointer"
                      >
                        Add to Kanban
                      </motion.div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
