'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';

export default function FloatingNavbar() {
  const { isAuthenticated } = useAuthStore();

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 inset-x-0 mx-auto max-w-5xl px-6 py-3 z-50 flex items-center justify-between bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_0_rgba(0,0,0,0.36)]"
    >
      <div className="flex items-center gap-3 text-white font-bold text-xl tracking-tight">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
          <span className="text-white font-black text-sm tracking-tighter">TM</span>
        </div>
        TaskMatrix
      </div>
      
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <Link 
            href="/dashboard"
            className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
          >
            Go to Dashboard
          </Link>
        ) : (
          <>
            <Link 
              href="/login"
              className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-2"
            >
              Sign In
            </Link>
            <Link 
              href="/register"
              className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(147,51,234,0.5)]"
            >
              Get Started
            </Link>
          </>
        )}
      </div>
    </motion.nav>
  );
}
