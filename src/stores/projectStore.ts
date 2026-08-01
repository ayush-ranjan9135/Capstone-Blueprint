import { create } from 'zustand';
import type { Project } from '@/types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  fetchProjects: () => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useProjectStore = create<ProjectState>()((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,

  fetchProjects: async () => {
    set({ isLoading: true });
    try {
      const res = await fetch(`${API_URL}/projects`);
      const projects: Project[] = await res.json();
      set({ projects, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  setCurrentProject: (project) => set({ currentProject: project }),
}));
