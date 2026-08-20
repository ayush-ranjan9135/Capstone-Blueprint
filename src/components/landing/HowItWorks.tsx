'use client';

import { motion } from 'framer-motion';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Create your workspace',
      description: 'Set up your project and invite your team in seconds.',
    },
    {
      number: '02',
      title: 'Organize your work',
      description: 'Create tasks, assign owners, and manage priorities on the board.',
    },
    {
      number: '03',
      title: 'Collaborate in real time',
      description: 'Keep everyone synchronized automatically as work changes.',
    },
    {
      number: '04',
      title: 'Move projects forward',
      description: 'Use insights and AI assistance to turn plans into execution.',
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden bg-white/[0.02] border-y border-white/5">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
          >
            How TaskMatrix works
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-400"
          >
            A frictionless workflow designed to get out of your way.
          </motion.p>
        </div>

        <div className="relative">
          {/* Connecting Line (Desktop) */}
          <div className="hidden lg:block absolute top-12 left-[8%] right-[8%] h-[2px] bg-white/5 overflow-hidden rounded-full z-0">
            <motion.div
              animate={{ x: ['-100%', '300%'] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
              className="h-full w-1/3 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-80"
            />
          </div>

          <div className="grid lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: i * 0.15 }}
                className="relative flex flex-col items-center lg:items-start text-center lg:text-left group cursor-default"
              >
                <motion.div 
                  whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(168,85,247,0.4)' }}
                  className="w-24 h-24 rounded-full bg-[#0A0A0A] border border-white/10 shadow-[0_0_20px_rgba(0,0,0,0.5)] flex items-center justify-center text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-white to-gray-600 mb-8 relative z-10 transition-colors duration-300 group-hover:border-purple-500/50 group-hover:from-purple-200 group-hover:to-indigo-400"
                >
                  {step.number}
                </motion.div>
                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
