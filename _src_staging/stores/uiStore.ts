import { create } from 'zustand';

interface UIState {
  sidebarOpen: boolean;
  taskModalOpen: boolean;
  commandPaletteOpen: boolean;
  activeView: 'board' | 'list';
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  openTaskModal: () => void;
  closeTaskModal: () => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;
  setActiveView: (view: 'board' | 'list') => void;
}

export const useUIStore = create<UIState>()((set) => ({
  sidebarOpen: true,
  taskModalOpen: false,
  commandPaletteOpen: false,
  activeView: 'board',
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  openTaskModal: () => set({ taskModalOpen: true }),
  closeTaskModal: () => set({ taskModalOpen: false }),
  openCommandPalette: () => set({ commandPaletteOpen: true }),
  closeCommandPalette: () => set({ commandPaletteOpen: false }),
  setActiveView: (view) => set({ activeView: view }),
}));
