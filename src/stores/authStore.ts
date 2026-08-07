import { create } from 'zustand'
import { User } from 'firebase/auth'

/**
 * Manages the global authentication state of the application.
 * This store synchronizes with Firebase's onAuthStateChanged observer
 * to provide a single source of truth for the current user's session.
 */
interface AuthState {
  /** The current Firebase User object, or null if unauthenticated. */
  user: User | null
  /** Derived boolean indicating if a valid user session exists. */
  isAuthenticated: boolean
  /** Indicates if the initial auth state is still being determined from Firebase. */
  isLoading: boolean
  /** Manually overrides the user object without changing the loading state. */
  setUser: (user: User | null) => void
  /** Sets the final authenticated user and terminates the initial loading state. */
  setAuth: (user: User | null) => void
  /** Clears the session entirely upon logout. */
  clearAuth: () => void
  /** Toggles the loading indicator manually if required by external processes. */
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
