'use client';

import { useTaskStore } from '@/stores/taskStore';
import { useAuthStore } from '@/stores/authStore';
import { CheckSquare, Square, Calendar, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function MyTasksList() {
  const { tasks, updateTaskStatus } = useTaskStore();
  const { user } = useAuthStore();

  const myTasks = tasks
    .filter((t) => t.assigneeId === user?.id && t.status !== 'done')
    .slice(0, 6);

  return (
    <div className="glass-panel p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">My Tasks</h2>
        <Link href="/tasks" className="flex items-center gap-1 text-xs text-brand hover:text-brand-hover transition-colors font-medium">
          View all <ArrowRight size={12} />
        </Link>
      </div>

      {myTasks.length === 0 ? (
        <div className="text-center py-8">
          <CheckSquare size={28} className="mx-auto mb-2 text-muted opacity-50" />
          <p className="text-sm text-secondary font-medium">You&apos;re all caught up!</p>
          <p className="text-xs mt-1 text-muted">No open tasks assigned to you.</p>
        </div>
      ) : (
        <div className="space-y-1">
          {myTasks.map((task) => {
            let priorityColor = 'bg-border-strong';
            let glowColor = '';
            if (task.priority === 'critical') { priorityColor = 'bg-error'; glowColor = 'shadow-[0_0_8px_rgba(239,68,68,0.8)]'; }
            else if (task.priority === 'high') { priorityColor = 'bg-warning'; glowColor = 'shadow-[0_0_8px_rgba(245,158,11,0.8)]'; }
            else if (task.priority === 'medium') { priorityColor = 'bg-brand'; glowColor = 'shadow-[0_0_8px_rgba(99,102,241,0.8)]'; }
            
            return (
              <div key={task.id}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 group hover:bg-white/5 transition-colors duration-200">
                <button
                  onClick={() => updateTaskStatus(task.id, 'done')}
                  className="w-5 h-5 rounded-[4px] border-[1.5px] border-border-strong hover:border-brand hover:bg-brand/10 transition-colors flex items-center justify-center flex-shrink-0 group/btn"
                  aria-label="Complete task">
                  <CheckSquare size={12} className="opacity-0 group-hover/btn:opacity-100 text-brand transition-opacity" />
                </button>

                <span className="flex-1 text-sm text-primary font-medium truncate">{task.title}</span>

                <div className="flex items-center gap-2.5 flex-shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
                  <div className={`w-2.5 h-2.5 rounded-full ${priorityColor} ${glowColor}`} />
                  {task.dueDate && (
                    <span className="flex items-center gap-1 text-[11px] text-muted font-medium">
                      <Calendar size={12} />
                      {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
