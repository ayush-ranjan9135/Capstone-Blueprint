'use client';
import { motion, Variants } from 'framer-motion';
import { LayoutDashboard, Sparkles, Shield, Zap } from 'lucide-react';

const features = [
  {
    title: 'Visual Kanban Boards',
    description: 'Organize tasks intuitively with drag-and-drop Kanban columns. Spot bottlenecks instantly.',
    icon: <LayoutDashboard size={24} className="text-white" />
  },
  {
    title: 'Gemini AI Assistant',
    description: 'Break down complex tasks into actionable sub-steps automatically with Google Gemini AI.',
    icon: <Sparkles size={24} className="text-white" />
  },
  {
    title: 'Bulletproof Security',
    description: 'Enterprise-grade Firebase rules ensure your workspace data is strictly isolated and secure.',
    icon: <Shield size={24} className="text-white" />
  },
  {
    title: 'Real-time Sync',
    description: 'Optimistic UI updates powered by Zustand guarantee a lightning-fast, zero-latency feel.',
    icon: <Zap size={24} className="text-white" />
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export default function FeatureGrid() {
  return (
    <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto z-10 relative">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to ship faster.</h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          We rebuilt the traditional project management tool from the ground up, stripping away the bloat and focusing purely on speed and clarity.
        </p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >
        {features.map((feature, idx) => (
          <motion.div 
            key={idx}
            variants={itemVariants}
            className="p-8 bg-white/[0.03] backdrop-blur-xl rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.36)] hover:bg-white/[0.05] transition-colors duration-300 group cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center mb-6 shadow-lg shadow-purple-500/20 group-hover:scale-110 transition-transform duration-300">
              {feature.icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
            <p className="text-gray-400 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
