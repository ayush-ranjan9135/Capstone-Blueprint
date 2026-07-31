'use client';

import { useEffect } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import { KanbanBoard } from '@/components/kanban/KanbanBoard';

export default function TasksPage() {
  const { fetchTasks, tasks } = useTaskStore();

  useEffect(() => { fetchTasks(); }, [fetchTasks]);

  return (
    <div className="space-y-6 animate-fade-up h-full flex flex-col">
      <div className="flex-shrink-0 mb-4">
        <h1 className="text-3xl font-extrabold gradient-text tracking-tight pb-1">All Tasks</h1>
        <p className="text-sm mt-1 text-secondary font-medium">
          {tasks.length} tasks across all projects
        </p>
      </div>
      <div className="flex-1 min-h-0 flex flex-col">
        <KanbanBoard />
      </div>
    </div>
  );
}
