'use client';

import { motion } from 'framer-motion';
import { LayoutList, SearchX, Clock, ArrowRight } from 'lucide-react';

export default function ProblemSection() {
  const problems = [
    {
      title: 'Scattered Tasks',
      description: 'Work lives in chat, emails, and spreadsheets, making it impossible to see the big picture.',
      icon: LayoutList,
    },
    {
      title: 'Unclear Priorities',
      description: 'Without a single source of truth, teams waste time figuring out what to work on next.',
      icon: SearchX,
    },
    {
      title: 'Missed Deadlines',
      description: 'Manual updates and disconnected tools lead to slipped timelines and delayed launches.',
      icon: Clock,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-gradient-to-b from-transparent to-black/40 border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
          >
            Work shouldn&apos;t feel harder than the work itself.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            Most teams spend more time managing their work than actually doing it. 
            Constant context switching between disconnected tools drains productivity.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 flex flex-col items-center text-center group hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-12 h-12 rounded-xl bg-gray-500/10 flex items-center justify-center mb-6 text-gray-400 group-hover:text-white transition-colors">
                <problem.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{problem.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/20 rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.05] mix-blend-overlay" />
          <div className="relative z-10 flex flex-col items-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">TaskMatrix brings everything together.</h3>
            <p className="text-purple-200 mb-8 max-w-2xl text-lg">
              One focused workspace for your entire team. Stop switching tabs and start shipping.
            </p>
            <div className="flex items-center text-purple-400 font-medium">
              See how we solve it <ArrowRight className="w-4 h-4 ml-2" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
