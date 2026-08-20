'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: 'What is TaskMatrix?',
      answer: 'TaskMatrix is a modern project and task management platform designed to help teams organize work, collaborate in real time, and break down complex projects using AI assistance.',
    },
    {
      question: 'Does TaskMatrix support real-time updates?',
      answer: 'Yes! TaskMatrix uses real-time state synchronization. If a teammate moves a task on their Kanban board, you will see it update instantly on your screen without having to refresh.',
    },
    {
      question: 'How does the AI assistant work?',
      answer: 'Our integrated Gemini AI assistant helps you break down large, intimidating tasks (epics) into smaller, actionable subtasks. With one click, it analyzes your task description and generates a checklist of next steps.',
    },
    {
      question: 'How is project data protected?',
      answer: 'TaskMatrix is built on Google Firebase infrastructure. We use robust authentication and strict Firestore security rules to ensure your workspace data is completely isolated and only accessible to authorized team members.',
    },
    {
      question: 'How do I get started?',
      answer: 'Simply click "Get Started Free" to create an account. You can immediately create your first workspace, invite your team, and start managing tasks on your Kanban board.',
    },
  ];

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-3xl px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-6"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 group relative ${
                openIndex === i 
                  ? 'border-purple-500/50 bg-purple-500/5 shadow-[0_0_30px_rgba(168,85,247,0.1)]' 
                  : 'border-white/10 bg-[#0A0A0A] hover:border-white/20 hover:bg-white/[0.02]'
              }`}
            >
              {/* Active Indicator Glow */}
              <div className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-purple-500 to-indigo-500 transition-opacity duration-300 ${openIndex === i ? 'opacity-100' : 'opacity-0'}`} />
              
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`font-medium transition-all duration-300 ${openIndex === i ? 'text-purple-400 translate-x-2' : 'text-white group-hover:translate-x-1'}`}>
                  {faq.question}
                </span>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${openIndex === i ? 'bg-purple-500/20 text-purple-400' : 'bg-white/5 text-gray-400 group-hover:bg-white/10'}`}>
                  <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${openIndex === i ? 'rotate-180' : ''}`} />
                </div>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-8 pb-6 pt-0 text-gray-400 text-sm leading-relaxed">
                      <div className="pt-4 border-t border-white/5">
                        {faq.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
