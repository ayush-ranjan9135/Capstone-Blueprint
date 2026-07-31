import { create } from 'zustand';

export type TaskStatus = 'backlog' | 'todo' | 'in-progress' | 'in-review' | 'done';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Comment {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  projectId: string;
  sprintId?: string;
  assigneeId?: string;
  reporterId?: string;
  labels: string[];
  storyPoints?: number;
  startDate?: string;
  dueDate?: string;
  subtasks: Subtask[];
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
}

interface TaskFilters {
  status?: TaskStatus;
  priority?: Priority;
  assigneeId?: string;
  search?: string;
}

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  filters: TaskFilters;
  isLoading: boolean;
  error: string | null;
  fetchTasks: (projectId?: string) => Promise<void>;
  createTask: (data: Partial<Task>) => Promise<void>;
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  deleteTask: (id: string) => Promise<void>;
  selectTask: (task: Task | null) => void;
  setFilters: (filters: Partial<TaskFilters>) => void;
  getTasksByStatus: (status: TaskStatus) => Task[];
  getFilteredTasks: () => Task[];
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useTaskStore = create<TaskState>()((set, get) => ({
  tasks: [],
  selectedTask: null,
  filters: {},
  isLoading: false,
  error: null,

  fetchTasks: async (projectId?: string) => {
    set({ isLoading: true, error: null });
    try {
      const url = projectId
        ? `${API_URL}/tasks?projectId=${projectId}`
        : `${API_URL}/tasks`;
      const res = await fetch(url);
      const tasks: Task[] = await res.json();
      set({ tasks, isLoading: false });
    } catch {
      set({ error: 'Failed to fetch tasks', isLoading: false });
    }
  },

  createTask: async (data: Partial<Task>) => {
    try {
      const newTask: Task = {
        id: `tm-${Date.now()}`,
        title: data.title || 'Untitled Task',
        status: data.status || 'todo',
        priority: data.priority || 'medium',
        projectId: data.projectId || 'proj-1',
        labels: data.labels || [],
        subtasks: [],
        comments: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        ...data,
      };
      await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });
      set((state) => ({ tasks: [...state.tasks, newTask] }));
    } catch {
      set({ error: 'Failed to create task' });
    }
  },

  updateTask: async (id: string, data: Partial<Task>) => {
    const prevTasks = get().tasks;
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
      ),
    }));
    try {
      await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, updatedAt: new Date().toISOString() }),
      });
    } catch {
      set({ tasks: prevTasks, error: 'Failed to update task' });
    }
  },

  updateTaskStatus: async (id: string, status: TaskStatus) => {
    get().updateTask(id, { status });
  },

  deleteTask: async (id: string) => {
    const prevTasks = get().tasks;
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    try {
      await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
    } catch {
      set({ tasks: prevTasks, error: 'Failed to delete task' });
    }
  },

  selectTask: (task) => set({ selectedTask: task }),

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  getTasksByStatus: (status) => get().tasks.filter((t) => t.status === status),

  getFilteredTasks: () => {
    const { tasks, filters } = get();
    return tasks.filter((t) => {
      if (filters.status && t.status !== filters.status) return false;
      if (filters.priority && t.priority !== filters.priority) return false;
      if (filters.assigneeId && t.assigneeId !== filters.assigneeId) return false;
      if (filters.search) {
        const q = filters.search.toLowerCase();
        if (!t.title.toLowerCase().includes(q)) return false;
      }
      return true;
    });
  },
}));
