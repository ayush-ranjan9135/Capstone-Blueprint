'use client';

import { useTaskStore } from '@/stores/taskStore';

export function ActivityFeed() {
  const { tasks } = useTaskStore();

  const recent = [...tasks]
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime())
    .slice(0, 8);

  const statusConfig: Record<string, { label: string; dotClass: string; glowClass: string }> = {
    'backlog': { label: 'moved to Backlog', dotClass: 'bg-muted', glowClass: 'shadow-[0_0_8px_rgba(148,163,184,0.5)]' },
    'todo': { label: 'moved to To Do', dotClass: 'bg-info', glowClass: 'shadow-[0_0_8px_rgba(56,189,248,0.5)]' },
    'in-progress': { label: 'started work on', dotClass: 'bg-brand', glowClass: 'shadow-[0_0_8px_rgba(99,102,241,0.5)]' },
    'in-review': { label: 'submitted for review', dotClass: 'bg-warning', glowClass: 'shadow-[0_0_8px_rgba(245,158,11,0.5)]' },
    'done': { label: 'completed', dotClass: 'bg-success', glowClass: 'shadow-[0_0_8px_rgba(34,197,94,0.5)]' },
  };

  function relativeTime(iso: string) {
    const diff = (Date.now() - new Date(iso).getTime()) / 1000;
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.round(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.round(diff / 3600)}h ago`;
    return `${Math.round(diff / 86400)}d ago`;
  }

  return (
    <div className="glass-panel p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      <h2 className="text-sm font-semibold text-primary mb-6 uppercase tracking-wider">Activity Feed</h2>
      {recent.length === 0 ? (
        <p className="text-sm text-center py-6 text-muted">No activity yet</p>
      ) : (
        <div className="relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px before:h-full before:w-px before:bg-border-subtle/70 space-y-5">
          {recent.map((task) => {
            const s = statusConfig[task.status] || { label: 'updated', dotClass: 'bg-muted', glowClass: '' };
            return (
              <div key={task.id} className="relative flex items-start gap-5 group">
                {/* Timeline Dot container for perfect alignment */}
                <div className="relative mt-2 flex items-center justify-center w-6 h-6 flex-shrink-0 z-10 bg-surface rounded-full shadow-sm ring-4 ring-surface">
                  <div className={`w-2.5 h-2.5 rounded-full ${s.dotClass} ${s.glowClass}`} />
                </div>
                {/* Content Card */}
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
