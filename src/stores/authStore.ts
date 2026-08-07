import { create } from 'zustand'
import { User } from 'firebase/auth'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  setUser: (user: User | null) => void
  setAuth: (user: User | null) => void
  clearAuth: () => void
  setIsLoading: (isLoading: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true, // start loading to check session on mount
  setUser: (user) => set({ user, isAuthenticated: !!user }),
  setAuth: (user) => set({ user, isAuthenticated: !!user, isLoading: false }),
  clearAuth: () => set({ user: null, isAuthenticated: false, isLoading: false }),
  setIsLoading: (isLoading) => set({ isLoading }),
}))
