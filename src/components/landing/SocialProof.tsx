'use client';

import { motion } from 'framer-motion';

export default function SocialProof() {
  const items = [
    { label: 'FOCUS', value: 'Organized Workflows', desc: 'Eliminate context switching and keep your team aligned.' },
    { label: 'SPEED', value: 'Real-Time Updates', desc: 'Instant state synchronization across all clients.' },
    { label: 'SMART', value: 'AI Assistance', desc: 'Let Gemini break down epics into actionable tasks.' },
    { label: 'TRUST', value: 'Secure Data', desc: 'Enterprise-grade isolation via Firebase rules.' },
  ];

  return (
    <section className="py-24 relative bg-[#0A0A0A] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-12">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-2xl font-medium text-white tracking-tight"
          >
            Built around the fundamentals of productive teamwork.
          </motion.h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-white/10 relative">
          {items.map((item, i) => (
            <motion.div 
              key={item.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group p-8 border-r border-b border-white/10 hover:bg-white/[0.02] transition-colors relative overflow-hidden flex flex-col justify-between min-h-[200px]"
            >
              {/* Subtle hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="text-purple-400 font-mono text-xs tracking-widest mb-6 flex justify-between items-center">
                  <span>{item.label}</span>
                  <span className="text-white/20">0{i + 1}</span>
                </div>
                <h3 className="text-xl font-medium text-white mb-3 group-hover:text-purple-200 transition-colors">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
