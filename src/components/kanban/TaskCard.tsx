'use client';

import type { Task } from '@/types';
import { Calendar, GripVertical, CheckCircle2 } from 'lucide-react';

const priorityConfig: Record<string, { colorClass: string; glowClass: string; label: string }> = {
  critical: { colorClass: 'bg-error', glowClass: 'shadow-[0_0_8px_rgba(239,68,68,0.8)]', label: 'Critical' },
  high: { colorClass: 'bg-warning', glowClass: 'shadow-[0_0_8px_rgba(249,115,22,0.8)]', label: 'High' },
  medium: { colorClass: 'bg-brand', glowClass: 'shadow-[0_0_8px_rgba(255,255,255,0.4)]', label: 'Medium' },
  low: { colorClass: 'bg-muted', glowClass: 'shadow-[0_0_8px_rgba(113,113,122,0.5)]', label: 'Low' },
};

interface TaskCardProps {
  task: Task;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent) => void;
  onDragEnd: () => void;
  onClick: () => void;
}

export function TaskCard({ task, isDragging, onDragStart, onDragEnd, onClick }: TaskCardProps) {
  const p = priorityConfig[task.priority] || priorityConfig.medium;
  const completedSubtasks = task.subtasks.filter((s) => s.completed).length;
  const totalSubtasks = task.subtasks.length;
  const subtaskPct = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;
  const isOverdue = task.dueDate && task.status !== 'done' && new Date(task.dueDate) < new Date();

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClick}
      className={`rounded-xl p-4 cursor-pointer group transition-all duration-300 ${
        isDragging 
          ? 'glass-panel !border-brand/60 opacity-80 scale-[1.04] rotate-2 shadow-[0_10px_30px_rgba(255,255,255,0.1)] z-50' 
          : 'glass-panel border-border-subtle/50 hover:border-brand/40 hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:-translate-y-0.5'
      }`}
    >
      {/* Drag handle */}
      <div className="flex items-start gap-2 mb-2.5">
        <GripVertical size={14} className="mt-0.5 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab text-muted" />
        <p className="text-sm font-medium text-primary leading-snug flex-1">{task.title}</p>
      </div>

      {/* Labels */}
      {task.labels.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {task.labels.slice(0, 2).map((label) => (
            <span key={label} className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-surface text-secondary border border-border-subtle uppercase tracking-wider shadow-sm">
              {label}
            </span>
          ))}
        </div>
      )}

      {/* Subtask progress */}
      {totalSubtasks > 0 && (
        <div className="mb-3 bg-base rounded-lg p-2 border border-border-subtle">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-medium text-secondary flex items-center gap-1.5">
              <CheckCircle2 size={12} className={completedSubtasks === totalSubtasks ? 'text-success' : 'text-muted'}/>
              {completedSubtasks}/{totalSubtasks}
            </span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden bg-overlay">
            <div className="h-full rounded-full transition-all bg-success" style={{ width: `${subtaskPct}%` }} />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-2 border-t border-border-subtle/40 pt-3">
        <div className="flex items-center gap-2">
          <div className={`w-2.5 h-2.5 rounded-full ${p.colorClass} ${p.glowClass}`} />
          <span className="text-xs font-semibold text-secondary">{p.label}</span>
        </div>
        <div className="flex items-center gap-2.5">
          {task.storyPoints && (
            <span className="text-xs px-1.5 py-0.5 rounded-md font-bold bg-overlay text-muted border border-border-subtle">
              {task.storyPoints}
            </span>
          )}
          {task.dueDate && (
            <span className={`flex items-center gap-1.5 text-xs font-medium ${isOverdue ? 'text-error' : 'text-secondary'}`}>
              <Calendar size={12} />
              {new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
