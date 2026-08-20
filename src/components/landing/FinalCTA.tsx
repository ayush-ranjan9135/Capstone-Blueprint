'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="mx-auto max-w-5xl px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-10 md:p-16 text-center shadow-[0_0_50px_rgba(147,51,234,0.3)] relative overflow-hidden"
        >
          {/* Internal Glow / Noise */}
          <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-[0.1] mix-blend-overlay" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/20 blur-[80px] rounded-full pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-6">
              Bring your team's work into focus.
            </h2>
            <p className="text-lg text-purple-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Start organizing projects, collaborating in real time, and turning complex work into clear next steps.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                href="/register" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold text-purple-900 bg-white hover:bg-gray-100 transition-colors shadow-xl flex items-center justify-center gap-2 group"
              >
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/login" 
                className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-medium text-white bg-black/20 hover:bg-black/30 border border-white/20 transition-colors flex items-center justify-center"
              >
                Sign In
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
