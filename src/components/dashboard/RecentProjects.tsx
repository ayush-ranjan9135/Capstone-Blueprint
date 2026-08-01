'use client';

import { useMemo } from 'react';
import { useProjectStore } from '@/stores/projectStore';
import { useTaskStore } from '@/stores/taskStore';
import type { Project } from '@/types';

function ProjectProgressCard({ name, color, done, total, pct }: Project & { done: number; total: number; pct: number }) {
  return (
    <div className="rounded-xl p-4 bg-white dark:bg-white/5 shadow-sm border border-border-subtle hover:border-brand/30 hover:shadow-md transition-all group">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-3 h-3 rounded-full flex-shrink-0 shadow-[0_0_8px_currentColor]" style={{ background: color, color: color }} />
        <span className="text-sm font-semibold text-primary flex-1 truncate group-hover:text-brand transition-colors">{name}</span>
        <span className={`text-xs font-bold ${pct === 100 ? 'text-success' : 'text-secondary'}`}>
          {pct}%
        </span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden bg-border-subtle/50">
        <div className="h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${pct}%`, background: pct === 100 ? 'var(--color-success)' : color }} />
      </div>
      <p className="text-xs mt-2 text-muted font-medium">
        {done} / {total} tasks complete
      </p>
    </div>
  );
}

export function RecentProjects() {
  const { projects } = useProjectStore();
  const { tasks } = useTaskStore();

  const projectsWithStats = useMemo(() => {
    return projects.slice(0, 3).map((p) => {
      const projectTasks = tasks.filter((t) => t.projectId === p.id);
      const done = projectTasks.filter((t) => t.status === 'done').length;
      const total = projectTasks.length;
      const pct = total === 0 ? 0 : Math.round((done / total) * 100);
      return { ...p, done, total, pct };
    });
  }, [projects, tasks]);

  return (
    <div className="glass-panel p-6 shadow-md transition-all duration-300 hover:shadow-lg">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">Active Projects</h2>
      </div>

      {projectsWithStats.length === 0 ? (
        <p className="text-sm text-center py-8 text-muted">No projects yet</p>
      ) : (
        <div className="space-y-4">
          {projectsWithStats.map((p) => (
            <ProjectProgressCard key={p.id} {...p} />
          ))}
        </div>
      )}
    </div>
  );
}
