'use client';

import { motion } from 'framer-motion';
import { Columns, KanbanSquare, Sparkles, ShieldCheck, Zap, Users2 } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      title: 'Visual Task Management',
      description: 'Organize work using intuitive project and task views that give you clarity on what needs to be done.',
      icon: Columns,
    },
    {
      title: 'Kanban Boards',
      description: 'Visualize your entire workflow and identify bottlenecks quickly with drag-and-drop boards.',
      icon: KanbanSquare,
    },
    {
      title: 'Real-Time Collaboration',
      description: 'Keep team changes synchronized instantly without unnecessary page refreshes.',
      icon: Users2,
    },
    {
      title: 'AI Task Assistant',
      description: 'Use Gemini-powered assistance to break complex work into actionable, step-by-step subtasks.',
      icon: Sparkles,
    },
    {
      title: 'Secure Workspaces',
      description: 'Keep project data isolated using proper access controls and enterprise-grade security rules.',
      icon: ShieldCheck,
    },
    {
      title: 'Fast, Responsive Experience',
      description: 'Optimistic UI updates and efficient rendering keep interactions lightning fast.',
      icon: Zap,
    },
  ];

  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
          >
            Everything your team needs to <br className="hidden sm:block" />
            move work forward.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            A carefully curated set of tools designed to help you execute, not just plan.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0A0A0A] border border-white/10 hover:border-purple-500/50 rounded-2xl p-8 transition-colors group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10">
                <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-gray-400 group-hover:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/20 transition-all">
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
