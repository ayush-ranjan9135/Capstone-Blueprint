'use client';

import { motion } from 'framer-motion';
import { Sparkles, Bot, CornerDownRight } from 'lucide-react';

export default function AIAssistantSection() {
  const steps = [
    'Define requirements and scope',
    'Prepare design assets and copy',
    'Implement the landing page UI',
    'Add analytics and tracking',
    'Test responsiveness across devices',
    'Prepare for deployment',
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10 flex flex-col lg:flex-row items-center gap-16">
        <div className="lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-500/10 px-4 py-1.5 text-sm font-medium text-indigo-400 ring-1 ring-inset ring-indigo-500/20 mb-6">
              <Sparkles className="w-4 h-4" />
              Gemini AI Integration
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6">
              Your work, with a little more intelligence.
            </h2>
            <p className="text-lg text-gray-400 mb-8 leading-relaxed">
              Stuck on a massive project? Turn complex, intimidating tasks into smaller, actionable steps instantly with our integrated Gemini AI assistant.
            </p>
            
            <ul className="space-y-4">
              {[
                'Instantly break down complex tickets',
                'Generate accurate subtask checklists',
                'Overcome blank page syndrome',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-gray-300">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <div className="lg:w-1/2 w-full">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            className="bg-white/[0.02] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden"
          >
            {/* User Input representation */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-500 to-indigo-500" />
                <span className="font-medium text-white text-sm">Launch new marketing website</span>
              </div>
              <div className="text-xs text-gray-500 flex items-center gap-1">
                <Bot className="w-3 h-3" /> Asking AI to break this down...
              </div>
            </div>

            {/* AI Output representation */}
            <div className="space-y-3 relative">
              <div className="absolute left-3 top-0 bottom-4 w-px bg-indigo-500/20" />
              {steps.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                  className="flex items-center gap-4 relative"
                >
                  <div className="bg-[#050505] p-1 relative z-10">
                    <CornerDownRight className="w-4 h-4 text-indigo-500/50" />
                  </div>
                  <div className="flex-1 bg-indigo-500/5 border border-indigo-500/10 rounded-lg p-3 text-sm text-gray-300 flex items-center justify-between group cursor-default">
                    <span>{step}</span>
                    <div className="w-4 h-4 rounded border border-gray-600 opacity-50 group-hover:border-indigo-400 group-hover:opacity-100 transition-all" />
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Decorative Glow */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full filter blur-[80px] pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
