import { create } from 'zustand';
import type { Project } from '@/types';

interface ProjectState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  fetchProjects: () => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
}



export const useProjectStore = create<ProjectState>()((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,

  fetchProjects: async () => {
    set({ isLoading: true });
    // Mock projects for the dashboard since Firebase projects collection isn't implemented yet
    const mockProjects: Project[] = [
      { id: 'proj-1', name: 'TaskMatrix MVP', color: '#6366f1', description: 'Core app features', status: 'active', ownerId: 'system', memberIds: [], createdAt: '', updatedAt: '' },
      { id: 'proj-2', name: 'Marketing Site', color: '#10b981', description: 'Landing page', status: 'active', ownerId: 'system', memberIds: [], createdAt: '', updatedAt: '' },
    ];
    // Small delay to simulate network
    setTimeout(() => {
      set({ projects: mockProjects, isLoading: false });
    }, 500);
  },

  setCurrentProject: (project) => set({ currentProject: project }),
}));
