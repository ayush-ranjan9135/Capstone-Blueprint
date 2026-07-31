'use client';

import { useState } from 'react';
import { useTaskStore, type Task, type TaskStatus } from '@/stores/taskStore';
import { TaskCard } from './TaskCard';
import { TaskModal } from './TaskModal';
import { Plus } from 'lucide-react';

const COLUMNS: { id: TaskStatus; label: string; textClass: string; bgClass: string; borderClass: string }[] = [
  { id: 'backlog', label: 'Backlog', textClass: 'text-muted', bgClass: 'bg-muted/10', borderClass: 'border-muted' },
  { id: 'todo', label: 'To Do', textClass: 'text-info', bgClass: 'bg-info/10', borderClass: 'border-info' },
  { id: 'in-progress', label: 'In Progress', textClass: 'text-brand', bgClass: 'bg-brand/10', borderClass: 'border-brand' },
  { id: 'in-review', label: 'In Review', textClass: 'text-warning', bgClass: 'bg-warning/10', borderClass: 'border-warning' },
  { id: 'done', label: 'Done', textClass: 'text-success', bgClass: 'bg-success/10', borderClass: 'border-success' },
];

export function KanbanBoard() {
  const { tasks, getTasksByStatus, createTask, selectTask, updateTaskStatus } = useTaskStore();
  const [dragOverCol, setDragOverCol] = useState<TaskStatus | null>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [quickAdd, setQuickAdd] = useState<TaskStatus | null>(null);
  const [quickTitle, setQuickTitle] = useState('');

  const handleDragStart = (e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData('taskId', taskId);
    setDraggingId(taskId);
  };

  const handleDrop = (e: React.DragEvent, status: TaskStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) updateTaskStatus(taskId, status);
    setDragOverCol(null);
    setDraggingId(null);
  };

  const handleCardClick = (task: Task) => {
    selectTask(task);
    setModalOpen(true);
  };

  const handleQuickAdd = (status: TaskStatus) => {
    if (!quickTitle.trim()) { setQuickAdd(null); return; }
    createTask({ title: quickTitle.trim(), status, projectId: 'proj-1' });
    setQuickTitle('');
    setQuickAdd(null);
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-muted text-brand border border-brand/20">
            Sprint 13
          </span>
          <span className="text-xs font-medium text-secondary">{tasks.length} tasks</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => { selectTask(null); setModalOpen(true); }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white gradient-bg hover:shadow-[0_4px_12px_rgba(99,102,241,0.3)] transition-all duration-200 transform hover:scale-[1.02]">
            <Plus size={14} /> New Task
          </button>
        </div>
      </div>

      {/* Board */}
      <div className="flex gap-4 overflow-x-auto overflow-y-hidden pb-4 flex-1 h-full min-h-0">
        {COLUMNS.map((col) => {
          const colTasks = getTasksByStatus(col.id);
          const isOver = dragOverCol === col.id;
          return (
            <div
              key={col.id}
              className={`flex-shrink-0 w-72 flex flex-col rounded-2xl transition-all duration-300 border h-full ${
                isOver ? 'glass-panel !border-brand shadow-[0_0_15px_rgba(255,255,255,0.15)] bg-brand/5 scale-[1.01]' : 'glass-panel border-transparent hover:border-border-subtle/50'
              }`}
              onDragOver={(e) => { e.preventDefault(); setDragOverCol(col.id); }}
              onDragLeave={() => setDragOverCol(null)}
              onDrop={(e) => handleDrop(e, col.id)}>

              {/* Column header */}
              <div className="flex items-center justify-between p-3.5 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full ${col.bgClass.replace('/10', '')}`} />
                  <span className="text-sm font-semibold text-primary">{col.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${col.bgClass} ${col.textClass}`}>
                    {colTasks.length}
                  </span>
                </div>
                <button
                  onClick={() => { setQuickAdd(col.id); setQuickTitle(''); }}
                  className="w-6 h-6 flex items-center justify-center rounded-md text-muted hover:bg-base hover:text-primary transition-colors">
                  <Plus size={14} />
                </button>
              </div>

              {/* Cards */}
              <div className="flex-1 px-2.5 pb-2.5 space-y-2.5 overflow-y-auto">
                {colTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    isDragging={draggingId === task.id}
                    onDragStart={(e) => handleDragStart(e, task.id)}
                    onDragEnd={() => setDraggingId(null)}
                    onClick={() => handleCardClick(task)}
                  />
                ))}

                {/* Quick add input */}
                {quickAdd === col.id && (
                  <div className="rounded-lg p-2.5 bg-surface border-2 border-brand shadow-sm animate-fade-in">
                    <input
                      autoFocus
                      value={quickTitle}
                      onChange={(e) => setQuickTitle(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleQuickAdd(col.id);
                        if (e.key === 'Escape') setQuickAdd(null);
                      }}
                      placeholder="Task title… (Enter to save)"
                      className="w-full text-sm font-medium text-primary bg-transparent outline-none placeholder:text-muted placeholder:font-normal"
                    />
                    <div className="flex gap-2 mt-3">
                      <button onClick={() => handleQuickAdd(col.id)}
                        className="text-xs font-bold px-4 py-2 rounded-lg text-white gradient-bg transition-all duration-200 hover:shadow-md">
                        Save
                      </button>
                      <button onClick={() => setQuickAdd(null)}
                        className="text-xs font-medium px-4 py-2 rounded-lg text-secondary hover:bg-overlay hover:text-primary transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <TaskModal open={modalOpen} onClose={() => { setModalOpen(false); selectTask(null); }} />
    </div>
  );
}
