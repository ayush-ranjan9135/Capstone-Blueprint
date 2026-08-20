'use client';

import { motion } from 'framer-motion';
import { Code2, MonitorPlay, Briefcase } from 'lucide-react';

export default function UseCases() {
  const cases = [
    {
      title: 'Software Engineering Teams',
      description: 'Track bugs, plan sprints, and manage releases. Keep the entire development lifecycle organized in one place.',
      icon: Code2,
    },
    {
      title: 'Product Managers',
      description: 'Maintain product roadmaps, prioritize features, and use AI to break epics into manageable stories.',
      icon: MonitorPlay,
    },
    {
      title: 'Freelancers & Agencies',
      description: 'Manage multiple clients with secure, isolated workspaces. Never drop the ball on a deliverable again.',
      icon: Briefcase,
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
          >
            Built for the way modern teams work.
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {cases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.02] border border-white/5 rounded-2xl p-8 hover:bg-white/[0.04] transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6 text-indigo-400">
                <useCase.icon className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">{useCase.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
