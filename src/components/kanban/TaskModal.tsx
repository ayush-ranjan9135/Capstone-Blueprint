'use client';

import { useState, useEffect } from 'react';
import { useTaskStore } from '@/stores/taskStore';
import type { TaskStatus, Priority } from '@/types';
import { X, Trash2, Calendar, Tag, AlignLeft, CheckSquare, Square, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';

const statusOptions: { value: TaskStatus; label: string; textClass: string }[] = [
  { value: 'backlog', label: 'Backlog', textClass: 'text-muted' },
  { value: 'todo', label: 'To Do', textClass: 'text-info' },
  { value: 'in-progress', label: 'In Progress', textClass: 'text-brand' },
  { value: 'in-review', label: 'In Review', textClass: 'text-warning' },
  { value: 'done', label: 'Done', textClass: 'text-success' },
];

const priorityOptions: { value: Priority; label: string; textClass: string }[] = [
  { value: 'critical', label: 'Critical', textClass: 'text-error' },
  { value: 'high', label: 'High', textClass: 'text-warning' },
  { value: 'medium', label: 'Medium', textClass: 'text-brand' },
  { value: 'low', label: 'Low', textClass: 'text-muted' },
];

interface TaskModalProps {
  open: boolean;
  onClose: () => void;
}

export function TaskModal({ open, onClose }: TaskModalProps) {
  const { selectedTask, updateTask, createTask, deleteTask } = useTaskStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('todo');
  const [priority, setPriority] = useState<Priority>('medium');
  const [dueDate, setDueDate] = useState('');
  const [storyPoints, setStoryPoints] = useState('');
  const [subtasks, setSubtasks] = useState<{ id: string; title: string; completed: boolean }[]>([]);
  const [newSubtask, setNewSubtask] = useState('');
  const [isConfirmingDelete, setIsConfirmingDelete] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    if (selectedTask) {
      setTimeout(() => {
        setTitle(selectedTask.title);
        setDescription(selectedTask.description || '');
        setStatus(selectedTask.status);
        setPriority(selectedTask.priority);
        setDueDate(selectedTask.dueDate || '');
        setStoryPoints(selectedTask.storyPoints?.toString() || '');
        setSubtasks(selectedTask.subtasks || []);
        setIsConfirmingDelete(false);
        setIsSaving(false);
      }, 0);
    } else {
      setTimeout(() => {
        setTitle(''); setDescription(''); setStatus('todo');
        setPriority('medium'); setDueDate(''); setStoryPoints('');
        setSubtasks([]);
        setIsConfirmingDelete(false);
        setIsSaving(false);
      }, 0);
    }
  }, [selectedTask, open]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Task title is required');
      return;
    }
    
    setIsSaving(true);
    const data = {
      title, description, status, priority,
      dueDate: dueDate || undefined,
      storyPoints: storyPoints ? parseInt(storyPoints) : undefined,
      subtasks,
    };
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, data);
        toast.success('Task updated successfully');
      } else {
        await createTask({ ...data, projectId: 'proj-1' });
        toast.success('Task created successfully');
      }
      onClose();
    } catch {
      toast.error('Failed to save task');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (selectedTask) {
      try {
        await deleteTask(selectedTask.id);
        toast.success('Task deleted successfully');
        onClose();
      } catch {
        toast.error('Failed to delete task');
      }
    }
  };

  const handleGenerateSubtasks = async () => {
    if (!title.trim()) {
      toast.error('Please enter a task title first');
      return;
    }
    
    setIsGeneratingAI(true);
    try {
      const response = await fetch('/api/ai/task-breakdown', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description }),
      });
      
      const data = await response.json();
      
      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to generate subtasks');
      }
      
      const aiSubtasks = data.data.subtasks.map((st: string) => ({
        id: `st-ai-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title: st,
        completed: false
      }));
      
      setSubtasks((prev) => [...prev, ...aiSubtasks]);
      toast.success('AI subtasks generated');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Unable to generate AI suggestions');
    } finally {
      setIsGeneratingAI(false);
    }
  };

  const addSubtask = () => {
    if (!newSubtask.trim()) return;
    setSubtasks((prev) => [...prev, { id: `st-${Date.now()}`, title: newSubtask.trim(), completed: false }]);
    setNewSubtask('');
  };

  const toggleSubtask = (id: string) => {
    setSubtasks((prev) => prev.map((s) => s.id === id ? { ...s, completed: !s.completed } : s));
  };

  const currentStatus = statusOptions.find((s) => s.value === status);
  const currentPriority = priorityOptions.find((p) => p.value === priority);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in bg-black/60 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-modal-title"
    >

      <div className="w-full max-w-3xl max-h-[85vh] overflow-hidden flex flex-col rounded-2xl animate-fade-up bg-surface border border-border-subtle shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0 border-b border-border-subtle bg-base">
          <span className="text-xs font-mono font-bold text-muted bg-overlay px-2 py-1 rounded">
            {selectedTask ? `#${selectedTask.id.toUpperCase()}` : 'NEW TASK'}
          </span>
          <button onClick={onClose} aria-label="Close modal" className="w-8 h-8 flex items-center justify-center rounded-lg text-muted hover:text-primary hover:bg-overlay transition-colors">
            <X size={16} />
          </button>
        </div>

        <div className="flex flex-1 min-h-0 overflow-hidden flex-col md:flex-row">
          {/* Left — content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Title */}
            <input
              id="task-modal-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Task title"
              aria-label="Task title"
              className="w-full text-2xl font-bold text-primary bg-transparent outline-none placeholder:text-muted placeholder:font-normal"
            />

            {/* Description */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <AlignLeft size={14} className="text-secondary" />
                <span className="text-sm font-semibold text-primary">Description</span>
              </div>
              <textarea
                id="task-description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a detailed description…"
                aria-label="Task description"
                rows={5}
                className="w-full text-sm text-primary bg-base border border-border-subtle rounded-xl p-3 outline-none resize-none placeholder:text-muted focus:border-brand focus:ring-1 focus:ring-brand transition-all"
              />
            </div>

            {/* Subtasks */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <CheckSquare size={14} className="text-secondary" />
                  <span className="text-sm font-semibold text-primary">Subtasks</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleGenerateSubtasks}
                    disabled={isGeneratingAI || !title.trim()}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold bg-brand/10 text-brand hover:bg-brand/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors border border-brand/20"
                  >
                    <Sparkles size={12} className={isGeneratingAI ? 'animate-pulse' : ''} />
                    {isGeneratingAI ? 'Generating...' : 'Generate AI Subtasks'}
                  </button>
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-base border border-border-subtle text-secondary">
                    {subtasks.filter(s => s.completed).length} / {subtasks.length} done
                  </span>
                </div>
              </div>
              
              <div className="space-y-2 mb-3">
                {subtasks.map((s) => (
                  <div key={s.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-base transition-colors border border-transparent hover:border-border-subtle group">
                    <button onClick={() => toggleSubtask(s.id)} className={s.completed ? 'text-success' : 'text-muted group-hover:text-primary transition-colors'}>
                      {s.completed ? <CheckSquare size={16} /> : <Square size={16} />}
                    </button>
                    <span className={`text-sm flex-1 ${s.completed ? 'text-muted line-through' : 'text-primary'}`}>
                      {s.title}
                    </span>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={newSubtask}
                  onChange={(e) => setNewSubtask(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSubtask()}
                  placeholder="Add a new subtask…"
                  className="flex-1 text-sm text-primary bg-base border border-border-subtle rounded-lg px-3 py-2 outline-none focus:border-brand"
                />
                {newSubtask.length > 0 && (
                  <button onClick={() => setNewSubtask('')} className="text-sm font-medium px-3 py-2 rounded-lg bg-base border border-border-strong text-secondary hover:bg-overlay hover:text-primary transition-colors">
                    Cancel
                  </button>
                )}
                <button onClick={addSubtask} className="text-sm font-medium px-4 py-2 rounded-lg bg-base border border-border-strong text-primary hover:bg-overlay transition-colors">
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Right — metadata */}
          <div className="w-full md:w-64 flex-shrink-0 p-5 space-y-5 overflow-y-auto border-t md:border-t-0 md:border-l border-border-subtle bg-base">

            {/* Status */}
            <div>
              <label htmlFor="task-status" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Status</label>
              <select id="task-status" value={status} onChange={(e) => setStatus(e.target.value as TaskStatus)}
                className={`w-full text-sm font-medium px-3 py-2 rounded-lg outline-none bg-surface border border-border-strong focus:border-brand ${currentStatus?.textClass}`}>
                {statusOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Priority */}
            <div>
              <label htmlFor="task-priority" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2">Priority</label>
              <select id="task-priority" value={priority} onChange={(e) => setPriority(e.target.value as Priority)}
                className={`w-full text-sm font-medium px-3 py-2 rounded-lg outline-none bg-surface border border-border-strong focus:border-brand ${currentPriority?.textClass}`}>
                {priorityOptions.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>

            {/* Due date */}
            <div>
              <label htmlFor="task-due-date" className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Calendar size={12} /> Due Date
              </label>
              <input id="task-due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-sm font-medium px-3 py-2 rounded-lg outline-none text-primary bg-surface border border-border-strong focus:border-brand"
              />
            </div>

            {/* Story points */}
            <div>
              <label className="block text-xs font-semibold text-secondary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Tag size={12} /> Story Points
              </label>
              <input type="number" value={storyPoints} onChange={(e) => setStoryPoints(e.target.value)}
                min="0" max="99" placeholder="—"
                className="w-full text-sm font-medium px-3 py-2 rounded-lg outline-none text-primary bg-surface border border-border-strong focus:border-brand"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 flex-shrink-0 border-t border-border-subtle bg-base">
          {selectedTask && !isConfirmingDelete ? (
            <button onClick={() => setIsConfirmingDelete(true)} className="flex items-center gap-1.5 text-xs font-semibold text-error hover:bg-error-bg px-3 py-2 rounded-lg transition-colors">
              <Trash2 size={14} /> Delete Task
            </button>
          ) : selectedTask && isConfirmingDelete ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-medium text-error">Are you sure you want to delete this item?</span>
              <button onClick={() => setIsConfirmingDelete(false)} className="text-xs font-semibold px-3 py-1.5 rounded-lg text-secondary hover:bg-surface border border-transparent hover:border-border-strong transition-colors">
                Cancel
              </button>
              <button onClick={handleDelete} className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white bg-error hover:bg-red-600 shadow-sm transition-all">
                Confirm Delete
              </button>
            </div>
          ) : (
            <div />
          )}
          
          {!isConfirmingDelete && (
            <div className="flex gap-3">
              <button onClick={onClose} className="text-sm font-semibold px-4 py-2 rounded-lg text-secondary hover:bg-surface border border-transparent hover:border-border-strong transition-colors">
                Cancel
              </button>
              <button onClick={handleSave} disabled={isSaving}
                className="text-sm font-semibold px-5 py-2 rounded-lg text-white bg-brand hover:bg-brand-hover shadow-sm transition-all transform hover:-translate-y-[1px] disabled:opacity-70 disabled:hover:translate-y-0">
                {isSaving ? 'Saving...' : selectedTask ? 'Save Changes' : 'Create Task'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
