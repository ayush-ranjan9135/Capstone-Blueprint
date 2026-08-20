'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const { isAuthenticated } = useAuthStore();

  return (
    <section className="relative pt-40 pb-20 md:pt-52 md:pb-32 flex flex-col items-center justify-center text-center px-4 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="flex flex-col items-center max-w-4xl"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] backdrop-blur-xl border border-white/10 text-purple-400 text-sm font-medium mb-8 shadow-sm">
          <Sparkles size={14} />
          <span>Sprint 16 is live with Gemini AI</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-white leading-tight mb-6">
          Manage work <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            seamlessly.
          </span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          The all-in-one workspace for modern teams. Streamline your projects, track tasks, and collaborate in real-time.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link 
            href={isAuthenticated ? "/dashboard" : "/register"}
            className="group px-8 py-3 rounded-xl text-base font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)] flex items-center gap-2"
          >
            {isAuthenticated ? 'Enter Workspace' : 'Get Started'}
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {!isAuthenticated && (
            <Link 
              href="/login"
              className="px-8 py-3 rounded-xl text-base font-medium bg-white/[0.03] backdrop-blur-xl border border-white/10 text-gray-300 hover:text-white hover:bg-white/[0.05] transition-all duration-300"
            >
              Sign In
            </Link>
          )}
        </div>
      </motion.div>
    </section>
  );
}
