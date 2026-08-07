'use client';

import { useThemeStore } from '@/stores/themeStore';
import { useAuthStore } from '@/stores/authStore';
import { auth } from '@/lib/firebase/client';
import { signOut } from 'firebase/auth';
import { Search, Bell, Moon, Sun } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const pageTitles: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/projects': 'Projects',
  '/tasks': 'Tasks',
  '/calendar': 'Calendar',
  '/notifications': 'Notifications',
  '/profile': 'Profile',
  '/settings': 'Settings',
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme, initializeTheme } = useThemeStore();
  const { user, clearAuth } = useAuthStore();
  const pageTitle = pageTitles[pathname] || 'TaskMatrix';
  
  // Prevent hydration mismatch on theme icon
  const [mounted, setMounted] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    initializeTheme();
    setTimeout(() => setMounted(true), 0);
  }, [initializeTheme]);

  const toggleTheme = () => {
    if (theme === 'dark') setTheme('light');
    else if (theme === 'light') setTheme('dark');
    else {
      // If system, toggle to the opposite of current system
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'light' : 'dark');
    }
  };

  const isDarkMode = mounted && (theme === 'dark' || (theme === 'system' && document.documentElement.classList.contains('dark')));

  return (
    <header className="h-14 flex items-center px-6 gap-4 flex-shrink-0 bg-surface border-b border-border-subtle sticky top-0 z-40">
      <h2 className="font-semibold text-sm text-primary">{pageTitle}</h2>

      <div className="flex-1 max-w-md ml-8">
        <div className="flex items-center gap-2 px-4 py-2 rounded-xl cursor-text transition-all duration-300 bg-black/5 dark:bg-white/5 border border-transparent hover:border-border-strong focus-within:!border-brand focus-within:!bg-surface focus-within:shadow-[0_0_15px_rgba(var(--brand-rgb),0.1)]">
          <Search size={15} className="text-muted flex-shrink-0" />
          <input 
            type="text" 
            placeholder="Search tasks, projects…" 
            className="text-[13px] text-primary bg-transparent outline-none w-full placeholder:text-muted"
          />
          <kbd className="ml-auto text-[10px] px-1.5 py-0.5 rounded-md bg-white/50 dark:bg-black/30 text-muted border border-border-subtle font-semibold flex-shrink-0">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          aria-label="Toggle theme"
        >
          {mounted ? (isDarkMode ? <Sun size={17} /> : <Moon size={17} />) : <div className="w-4 h-4" />}
        </button>

        <button 
          onClick={() => router.push('/notifications')}
          className="w-9 h-9 flex items-center justify-center rounded-xl text-muted hover:text-primary hover:bg-black/5 dark:hover:bg-white/10 transition-colors relative"
          aria-label="View notifications"
        >
          <Bell size={17} />
          <span className="absolute top-2 right-2.5 w-2 h-2 rounded-full bg-brand ring-2 ring-surface shadow-[0_0_8px_currentColor]" />
        </button>

        <div className="w-px h-6 bg-border-subtle mx-2" />

        <div className="relative" ref={dropdownRef}>
          <button 
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[13px] font-bold cursor-pointer bg-gradient-to-tr from-brand to-brand-hover text-white shadow-md ring-2 ring-transparent hover:ring-brand-muted hover:scale-105 transition-all outline-none"
          >
            {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
          </button>
          
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-3 w-56 glass-panel p-2 shadow-xl origin-top-right z-50 flex flex-col gap-1"
              >
                <div className="px-3 py-2 border-b border-border-subtle mb-1">
                  <p className="text-sm font-semibold text-primary truncate">{user?.displayName || 'User'}</p>
                  <p className="text-xs text-muted truncate">{user?.email || 'user@example.com'}</p>
                </div>
                
                <Link href="/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-secondary hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  Profile
                </Link>
                <Link href="/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-secondary hover:text-primary hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                  Settings
                </Link>
                
                <div className="border-t border-border-subtle my-1" />
                
                <button 
                  onClick={async () => {
                    setProfileOpen(false);
                    if (auth) await signOut(auth);
                    clearAuth();
                    router.push('/login');
                  }} 
                  className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-error hover:bg-error-bg transition-colors text-left"
                >
                  Log out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
