import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch(`${API_URL}/users?email=${encodeURIComponent(email)}`);
          const users: (User & { password: string })[] = await res.json();
          const found = users.find((u) => u.email === email && u.password === password);
          if (!found) throw new Error('Invalid email or password');
          const { password: _pw, ...user } = found;
          const token = `mock-token-${user.id}-${Date.now()}`;
          set({ user, token, isAuthenticated: true, isLoading: false });
        } catch (err: unknown) {
          set({
            error: err instanceof Error ? err.message : 'Login failed',
            isLoading: false,
          });
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false, error: null });
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'taskmatrix:auth',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
