'use client';

import { useMemo } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { TASK_STATUS_CONFIG } from '@/lib/constants';
import { relativeTime } from '@/lib/utils';

export function ActivityFeed() {
  const { tasks } = useTaskStore();

  const recent = useMemo(() => {
    return [...tasks]
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
      .slice(0, 8);
  }, [tasks]);

  return (
    <div className="glass-panel p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      <h2 className="text-sm font-semibold text-primary mb-6 uppercase tracking-wider">Activity Feed</h2>
      {recent.length === 0 ? (
        <p className="text-sm text-center py-6 text-muted">No activity yet</p>
      ) : (
        <div className="relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-px before:bg-border-subtle/70 space-y-5">
          {recent.map((task) => {
            const s = TASK_STATUS_CONFIG[task.status] || { label: 'updated', dotClass: 'bg-muted', glowClass: '' };
            return (
              <div key={task.id} className="relative flex items-start gap-5 group">
                <div className="relative mt-2 flex items-center justify-center w-6 h-6 flex-shrink-0 z-10 bg-surface rounded-full shadow-sm ring-4 ring-surface">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.dotClass} ${s.glowClass}`} />
                </div>
                
                <div className="flex-1 min-w-0 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 p-3 rounded-xl transition-all duration-300">
                  <p className="text-[13px] leading-relaxed text-secondary">
                    <span className="font-medium text-muted">{s.label}</span>{' '}
                    <span className="font-semibold text-primary">{task.title}</span>
                  </p>
                  <p className="text-[11px] font-medium mt-1 text-muted">
                    {relativeTime(task.updatedAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
