'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error Boundary caught an error:', error);
  }, [error]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-base p-4">
      <div className="glass-panel p-8 rounded-2xl max-w-md w-full text-center space-y-6">
        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/20">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>
        
        <h2 className="text-2xl font-bold text-primary">Something went wrong!</h2>
        
        <p className="text-secondary text-sm">
          An unexpected error occurred. Our team has been notified.
          {process.env.NODE_ENV === 'development' && (
            <span className="block mt-2 text-red-400 font-mono text-xs text-left bg-black/20 p-2 rounded overflow-auto">
              {error.message}
            </span>
          )}
        </p>
        
        <div className="flex gap-3 justify-center pt-4">
          <button
            onClick={() => reset()}
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-white bg-brand hover:bg-brand-hover transition-colors shadow-md"
          >
            Try again
          </button>
          <Link
            href="/"
            className="px-6 py-2.5 rounded-xl text-sm font-semibold text-primary bg-surface border border-border hover:bg-surface-hover transition-colors"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}
