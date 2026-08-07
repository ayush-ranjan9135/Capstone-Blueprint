import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TaskMatrix — Agile Project Management',
  description:
    'Modern agile project management platform for engineering teams. Kanban boards, sprint planning, and task management.',
};

// This script runs before React hydration to prevent flash of wrong theme
const themeScript = `
  let theme = 'system';
  try {
    const stored = localStorage.getItem('taskmatrix:theme');
    if (stored) {
      const parsed = JSON.parse(stored);
      theme = parsed.state.theme || 'system';
    }
  } catch (e) {}

  if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
`;

import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className={`${inter.variable} font-sans antialiased bg-base text-primary transition-colors duration-200`}>
        <Toaster position="bottom-right" toastOptions={{
          style: {
            background: '#333',
            color: '#fff',
          }
        }} />
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
