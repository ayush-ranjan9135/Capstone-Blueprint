'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { useUIStore } from '@/stores/uiStore';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { sidebarOpen } = useUIStore();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsMounted(true), 0);
  }, []);

  useEffect(() => {
    if (isMounted && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isAuthenticated, router, isMounted]);

  if (!isMounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-brand/30 border-t-brand animate-spin" />
          <span className="text-sm font-medium text-muted animate-pulse">Loading workspace...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-base text-primary transition-colors duration-200">
      <Sidebar />
      <div className={`flex flex-col flex-1 min-w-0 overflow-hidden transition-all duration-[250ms] ${sidebarOpen ? 'md:ml-[240px]' : 'md:ml-[64px]'} ml-0`}
        >
        <Header />
        <main className="flex-1 overflow-y-auto overflow-x-hidden min-w-0 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
