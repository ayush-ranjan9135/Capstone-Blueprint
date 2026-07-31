'use client';

import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

export default function CalendarPage() {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2);

  return (
    <div className="space-y-6 animate-fade-up h-full flex flex-col">
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-primary tracking-tight">Calendar</h1>
          <p className="text-sm mt-1 text-secondary font-medium">October 2026</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 rounded-md hover:bg-surface border border-transparent hover:border-border-subtle transition-colors">
            <ChevronLeft size={18} className="text-muted" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-surface border border-transparent hover:border-border-subtle transition-colors">
            <ChevronRight size={18} className="text-muted" />
          </button>
        </div>
      </div>

      <div className="flex-1 surface-panel overflow-hidden flex flex-col">
        {/* Days Header */}
        <div className="grid grid-cols-7 border-b border-border-subtle flex-shrink-0 bg-base">
          {days.map(d => (
            <div key={d} className="p-3 text-center text-xs font-semibold text-secondary uppercase tracking-wider">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 flex-1 overflow-y-auto bg-border-subtle gap-px">
          {dates.map((date, i) => {
            const isCurrentMonth = date > 0 && date <= 31;
            const isToday = date === 15;
            return (
              <div key={i} className={`p-2 bg-surface min-h-[100px] transition-colors hover:bg-base ${!isCurrentMonth ? 'opacity-50' : ''}`}>
                <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                  isToday ? 'bg-brand text-white shadow-sm' : 'text-primary'
                }`}>
                  {isCurrentMonth ? date : (date <= 0 ? 30 + date : date - 31)}
                </span>
                {date === 12 && (
                  <div className="mt-1 p-1.5 text-xs font-semibold rounded bg-warning-bg text-warning border border-warning/20">
                    Design Review
                  </div>
                )}
                {date === 15 && (
                  <div className="mt-1 p-1.5 text-xs font-semibold rounded bg-info-bg text-info border border-info/20 truncate">
                    Sprint Planning
                  </div>
                )}
                {date === 18 && (
                  <div className="mt-1 p-1.5 text-xs font-semibold rounded bg-brand-muted text-brand border border-brand/20 truncate">
                    Release v1.2
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
