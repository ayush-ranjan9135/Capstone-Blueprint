'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useTaskStore } from '@/stores/taskStore';
import { Task } from '@/types';

export default function CalendarPage() {
  const { tasks } = useTaskStore();
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const dates = Array.from({ length: 35 }, (_, i) => i - 2);

  const [selectedDate, setSelectedDate] = useState<{ day: number; dateString: string } | null>(null);

  const getTasksForDate = (day: number) => {
    const dateString = `2026-10-${day.toString().padStart(2, '0')}`;
    return tasks.filter(t => t.dueDate === dateString);
  };

  return (
    <div className="space-y-6 animate-fade-up h-full flex flex-col relative">
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
            const dayTasks = isCurrentMonth ? getTasksForDate(date) : [];
            const dateString = `2026-10-${date.toString().padStart(2, '0')}`;

            return (
              <div 
                key={i} 
                onClick={() => isCurrentMonth && setSelectedDate({ day: date, dateString })}
                className={`p-2 bg-surface min-h-[100px] transition-colors ${!isCurrentMonth ? 'opacity-50' : 'hover:bg-base cursor-pointer'}`}
              >
                <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${
                  isToday ? 'bg-brand text-white shadow-sm' : 'text-primary'
                }`}>
                  {isCurrentMonth ? date : (date <= 0 ? 30 + date : date - 31)}
                </span>
                
                <div className="mt-1 space-y-1">
                  {/* Keep the hardcoded placeholder tasks just for visuals on 12/15/18 */}
                  {date === 12 && (
                    <div className="p-1.5 text-xs font-semibold rounded bg-warning-bg text-warning border border-warning/20 truncate">
                      Design Review
                    </div>
                  )}
                  {date === 15 && (
                    <div className="p-1.5 text-xs font-semibold rounded bg-info-bg text-info border border-info/20 truncate">
                      Sprint Planning
                    </div>
                  )}
                  {date === 18 && (
                    <div className="p-1.5 text-xs font-semibold rounded bg-brand-muted text-brand border border-brand/20 truncate">
                      Release v1.2
                    </div>
                  )}

                  {/* Render actual tasks from Firestore */}
                  {dayTasks.map(t => (
                    <div key={t.id} className="p-1.5 text-xs font-semibold rounded bg-surface border border-border-strong text-primary truncate shadow-sm">
                      {t.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Date Popup Modal */}
      {selectedDate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
             onClick={(e) => e.target === e.currentTarget && setSelectedDate(null)}>
          <div className="w-full max-w-md bg-surface border border-border-subtle rounded-2xl shadow-2xl animate-fade-up overflow-hidden flex flex-col max-h-[80vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-subtle bg-base">
              <h2 className="text-lg font-bold text-primary">
                Tasks for October {selectedDate.day}, 2026
              </h2>
              <button onClick={() => setSelectedDate(null)} className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-primary hover:bg-overlay transition-colors">
                <X size={16} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto space-y-3">
              {getTasksForDate(selectedDate.day).length > 0 ? (
                getTasksForDate(selectedDate.day).map((t: Task) => (
                  <div key={t.id} className="p-4 rounded-xl border border-border-subtle bg-base hover:border-border-strong transition-colors group">
                    <h3 className="font-semibold text-primary">{t.title}</h3>
                    <div className="mt-2 flex items-center justify-between">
                      <span className={`text-xs font-medium px-2 py-1 rounded-full uppercase tracking-wider
                        ${t.status === 'done' ? 'bg-success-bg text-success' : 
                          t.status === 'in-progress' ? 'bg-brand-muted text-brand' : 
                          t.status === 'in-review' ? 'bg-warning-bg text-warning' : 
                          'bg-overlay text-secondary'}`}>
                        {t.status.replace('-', ' ')}
                      </span>
                      <span className="text-xs font-medium text-secondary capitalize">{t.priority} Priority</span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-secondary">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-overlay mb-3">
                    <CalendarIcon size={24} className="text-muted" />
                  </div>
                  <p className="font-medium text-sm">No tasks scheduled for this date.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Temporary icon since Calendar is not imported from lucide-react at the top
function CalendarIcon({ size = 24, ...props }: React.SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"/>
      <line x1="16" x2="16" y1="2" y2="6"/>
      <line x1="8" x2="8" y1="2" y2="6"/>
      <line x1="3" x2="21" y1="10" y2="10"/>
    </svg>
  );
}
