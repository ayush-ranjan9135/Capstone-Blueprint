'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LogOut, ChevronLeft, ChevronRight } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useUIStore } from '@/stores/uiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_ITEMS, BOTTOM_NAV_ITEMS } from '@/lib/constants';


export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const { sidebarOpen, toggleSidebar } = useUIStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <aside
      className="fixed left-0 top-0 h-full z-50 flex flex-col overflow-hidden transition-all duration-[250ms] bg-surface border-r border-border-subtle"
      style={{ width: sidebarOpen ? '240px' : '64px' }}>

      {/* Logo */}
      <div className="flex items-center h-14 px-4 flex-shrink-0 border-b border-border-subtle">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 bg-brand text-white shadow-sm shadow-brand/20">
          <svg viewBox="0 0 72 72" fill="none" className="w-4 h-4">
            <rect x="12" y="12" width="14" height="14" rx="3" fill="currentColor" opacity="1"/>
            <rect x="29" y="12" width="14" height="14" rx="3" fill="currentColor" opacity="0.6"/>
            <rect x="12" y="29" width="14" height="14" rx="3" fill="currentColor" opacity="0.6"/>
            <rect x="29" y="29" width="14" height="14" rx="3" fill="currentColor" opacity="1"/>
          </svg>
        </div>
        {sidebarOpen && (
          <span className="ml-2.5 font-semibold text-sm text-primary whitespace-nowrap overflow-hidden">
            TaskMatrix
          </span>
        )}
        <button
          onClick={toggleSidebar}
          className="ml-auto rounded-md p-1.5 text-muted hover:text-primary hover:bg-overlay transition-colors flex-shrink-0"
        >
          {sidebarOpen ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-1.5 relative">
        <AnimatePresence>
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
            const active = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link key={href} href={href} className="block relative focus:outline-none">
                <motion.div
                  whileHover={{ scale: 0.98, x: 2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`relative z-10 flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-colors duration-200 group overflow-hidden ${
                    active 
                      ? 'text-brand font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.05)]' 
                      : 'text-secondary hover:text-primary hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  {/* Active Background Glow */}
                  {active && (
                    <motion.div
                      layoutId="nav-bg"
                      className="absolute inset-0 bg-white dark:bg-white/10 border border-border-subtle rounded-xl shadow-sm"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  {/* Active left glowing indicator */}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1/2 bg-brand rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  
                  {/* Icon with micro-animation */}
                  <Icon 
                    size={18} 
                    className={`relative z-10 flex-shrink-0 transition-transform duration-300 ${
                      active ? 'scale-110 drop-shadow-sm text-brand' : 'group-hover:scale-110 group-hover:text-primary'
                    }`} 
                  />
                  
                  {sidebarOpen && (
                    <motion.span 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.2 }}
                      className="relative z-10 whitespace-nowrap overflow-hidden tracking-wide"
                    >
                      {label}
                    </motion.span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </AnimatePresence>
      </nav>

      <div className="px-2 pb-2 space-y-0.5 flex-shrink-0 border-t border-border-subtle pt-2">
        {BOTTOM_NAV_ITEMS.map(({ href, icon: Icon, label }) => (
          <Link key={href} href={href}
            className="flex items-center gap-3 px-2.5 py-2 rounded-lg text-sm text-secondary hover:bg-overlay hover:text-primary transition-all duration-150"
          >
            <Icon size={16} className="flex-shrink-0" />
            {sidebarOpen && <span>{label}</span>}
          </Link>
        ))}

        {/* User / logout */}
        <div className="flex items-center gap-3 px-2.5 py-2 rounded-lg border-t border-border-subtle mt-1 pt-3">
          <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-semibold bg-brand text-white shadow-sm">
            {user?.name?.[0] || 'U'}
          </div>
          {sidebarOpen && (
            <>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-primary truncate">{user?.name}</p>
                <p className="text-xs text-muted truncate">{user?.role}</p>
              </div>
              <button onClick={handleLogout} className="rounded-md p-1.5 text-muted hover:text-error hover:bg-error-bg transition-colors">
                <LogOut size={14} />
              </button>
            </>
          )}
        </div>
      </div>
    </aside>
  );
}
