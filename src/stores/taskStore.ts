import { create } from 'zustand';
import type { Task, TaskStatus, Priority } from '@/types';
import { logger } from '@/lib/logger';
import { db } from '@/lib/firebase/client';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { useAuthStore } from './authStore';

interface TaskFilters {
  status?: TaskStatus;
  priority?: Priority;
  assigneeId?: string;
  search?: string;
}

/**
 * Global state management for Tasks using Zustand.
 * Handles fetching, creating, updating, and filtering tasks,
 * interacting directly with Firebase Firestore.
 */
interface TaskState {
  /** The master array of all loaded tasks in the system. */
  tasks: Task[];
  /** The currently selected task for detailed viewing or editing. */
  selectedTask: Task | null;
  /** Active filters applied to the task list (e.g., status, search query). */
  filters: TaskFilters;
  /** Indicates if a network request is actively fetching or mutating tasks. */
  isLoading: boolean;
  /** Holds the latest error message if a network request fails. */
  error: string | null;
  /** Fetches all tasks for the current user. */
  fetchTasks: () => Promise<void>;
  /** Creates a new task and optimistically adds it to the local store. */
  createTask: (data: Partial<Task>) => Promise<void>;
  /** Updates an existing task and optimistically applies the change locally. */
  updateTask: (id: string, data: Partial<Task>) => Promise<void>;
  /** Convenience method for moving a task between Kanban columns. */
  updateTaskStatus: (id: string, status: TaskStatus) => Promise<void>;
  /** Deletes a task by ID and optimistically removes it locally. */
  deleteTask: (id: string) => Promise<void>;
  /** Sets the active task for the detail modal. */
  selectTask: (task: Task | null) => void;
  /** Merges new filters with existing ones to refine the task view. */
  setFilters: (filters: Partial<TaskFilters>) => void;
  /** Returns a subset of tasks matching a specific status (e.g., 'todo'). */
  getTasksByStatus: (status: TaskStatus) => Task[];
  /** Returns tasks filtered by the globally active `filters` object. */
  getFilteredTasks: () => Task[];
  /** Returns a limited subset of recent tasks assigned to a specific user. */
  getRecentTasks: (userId: string, limit: number) => Task[];
}

export const useTaskStore = create<TaskState>()((set, get) => ({
  tasks: [],
  selectedTask: null,
  filters: {},
  isLoading: false,
  error: null,

  fetchTasks: async () => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) {
      set({ tasks: [], isLoading: false });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      if (!db) throw new Error("Firestore not initialized");
      const q = query(collection(db, 'tasks'), where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      const tasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ id: doc.id, ...doc.data() } as Task);
      });
      set({ tasks, isLoading: false });
      logger.info('Tasks fetched successfully', { count: tasks.length });
    } catch (error) {
      set({ error: 'Failed to fetch tasks', isLoading: false });
      logger.error('Failed to fetch tasks', { error: String(error) });
    }
  },

  createTask: async (data: Partial<Task>) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    try {
      if (!db) throw new Error("Firestore not initialized");
      const newTaskData = {
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
        userId: userId, // Ensure ownership is strictly set to current user
      };
      
      const docRef = await addDoc(collection(db, 'tasks'), newTaskData);
      const newTask = { id: docRef.id, ...newTaskData } as Task;
      
      set((state) => ({ tasks: [...state.tasks, newTask] }));
      logger.info('Task created successfully', { taskId: newTask.id });
    } catch (error) {
      set({ error: 'Failed to create task' });
      logger.error('Failed to create task', { error: String(error) });
      throw error;
    }
  },

  updateTask: async (id: string, data: Partial<Task>) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    const prevTasks = get().tasks;
    
    // Optimistic update
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id ? { ...t, ...data, updatedAt: new Date().toISOString() } : t
      ),
    }));
    
    try {
      if (!db) throw new Error("Firestore not initialized");
      const taskRef = doc(db, 'tasks', id);
      
      // Exclude id and userId from being updated
      const updateData = { ...data } as Record<string, unknown>;
      delete updateData.id;
      delete updateData.userId;
      
      await updateDoc(taskRef, {
        ...updateData,
        updatedAt: new Date().toISOString()
      });
      logger.info('Task updated successfully', { taskId: id });
    } catch (error) {
      // Revert optimistic update
      set({ tasks: prevTasks, error: 'Failed to update task' });
      logger.error('Failed to update task', { error: String(error), taskId: id });
      throw error;
    }
  },

  updateTaskStatus: async (id: string, status: TaskStatus) => {
    get().updateTask(id, { status });
  },

  deleteTask: async (id: string) => {
    const userId = useAuthStore.getState().user?.uid;
    if (!userId) return;

    const prevTasks = get().tasks;
    set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) }));
    
    try {
      if (!db) throw new Error("Firestore not initialized");
      await deleteDoc(doc(db, 'tasks', id));
      logger.info('Task deleted successfully', { taskId: id });
    } catch (error) {
      set({ tasks: prevTasks, error: 'Failed to delete task' });
      logger.error('Failed to delete task', { error: String(error), taskId: id });
      throw error;
    }
  },

  selectTask: (task) => set({ selectedTask: task }),

  setFilters: (filters) =>
    set((state) => ({ filters: { ...state.filters, ...filters } })),

  getTasksByStatus: (status) => get().getFilteredTasks().filter((t) => t.status === status),

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

  getRecentTasks: (userId: string, limit: number) => {
    return get().tasks
      .filter((t) => (t.assigneeId === userId || t.userId === userId) && t.status !== 'done')
      .slice(0, limit);
  }
}));
