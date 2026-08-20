import React from 'react';
import { cn } from '@/lib/utils'; // Optional if used elsewhere

interface LogoProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
}

export function Logo({ className, size = 'md', showWordmark = true, ...props }: LogoProps) {
  const containerClasses = {
    sm: 'text-lg gap-2',
    md: 'text-2xl gap-3',
    lg: 'text-3xl gap-4',
  }[size];

  const iconClasses = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  }[size];

  const svgClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  }[size];

  return (
    <div 
      className={`flex items-center font-bold tracking-tight text-white transition-opacity hover:opacity-90 ${containerClasses} ${className || ''}`} 
      {...props}
    >
      <div className={`bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-purple-500/20 shrink-0 ${iconClasses}`}>
        {/* Minimal geometric grid/matrix representation */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={svgClasses}
        >
          {/* Main Matrix Grid - elegant rounded squares */}
          <rect x="4" y="4" width="6" height="6" rx="1.5" className="fill-white/90" />
          <rect x="14" y="4" width="6" height="6" rx="1.5" className="fill-white/60" />
          <rect x="4" y="14" width="6" height="6" rx="1.5" className="fill-white/60" />
          
          {/* Task check concept - replacing the bottom right square with a dynamic line/check */}
          <path
            d="M14 17L16 19L20.5 14.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {showWordmark && <span>TaskMatrix</span>}
    </div>
  );
}
