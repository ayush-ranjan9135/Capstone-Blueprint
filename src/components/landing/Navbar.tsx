'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuthStore } from '@/stores/authStore';
import { Logo } from '@/components/brand/Logo';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const { isAuthenticated } = useAuthStore();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Product', href: '#product' },
    { name: 'Features', href: '#features' },
    { name: 'Security', href: '#security' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-[#050505]/80 backdrop-blur-xl border-b border-white/10' : 'py-6 bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-center justify-between">
          <Link href="/">
            <Logo size="sm" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="relative text-sm font-medium text-gray-400 hover:text-white transition-all duration-300 py-1 group hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
              >
                {link.name}
                <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-gradient-to-r from-purple-500 to-indigo-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <Link 
                href="/dashboard"
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              >
                Dashboard
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
                  className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 transition-all duration-300 shadow-[0_0_20px_rgba(147,51,234,0.3)]"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-gray-400 hover:text-white p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505] pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className="text-2xl font-semibold text-gray-300 hover:text-white"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="h-px bg-white/10 w-full my-4" />
            {isAuthenticated ? (
              <Link 
                href="/dashboard"
                className="w-full text-center px-5 py-3 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex flex-col gap-4">
                <Link 
                  href="/login"
                  className="w-full text-center px-5 py-3 rounded-xl text-lg font-medium text-white bg-white/5 border border-white/10"
                >
                  Sign In
                </Link>
                <Link 
                  href="/register"
                  className="w-full text-center px-5 py-3 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600"
                >
                  Get Started Free
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
