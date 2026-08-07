import { describe, it, expect, beforeEach } from 'vitest'
import { useAuthStore } from '../authStore'
import { User } from 'firebase/auth'

describe('authStore', () => {
  beforeEach(() => {
    // Reset state before each test
    useAuthStore.setState({ user: null, isAuthenticated: false, isLoading: true })
  })

  it('initializes with default state', () => {
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(true)
  })

  it('sets user properly via setUser', () => {
    const mockUser = { uid: '123', email: 'test@example.com' } as unknown as User
    useAuthStore.getState().setUser(mockUser)
    
    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(true) // setUser shouldn't touch isLoading
  })

  it('sets auth properly via setAuth', () => {
    const mockUser = { uid: '123', email: 'test@example.com' } as unknown as User
    useAuthStore.getState().setAuth(mockUser)
    
    const state = useAuthStore.getState()
    expect(state.user).toEqual(mockUser)
    expect(state.isAuthenticated).toBe(true)
    expect(state.isLoading).toBe(false)
  })

  it('clears auth properly via clearAuth', () => {
    const mockUser = { uid: '123', email: 'test@example.com' } as unknown as User
    useAuthStore.getState().setAuth(mockUser)
    
    useAuthStore.getState().clearAuth()
    
    const state = useAuthStore.getState()
    expect(state.user).toBeNull()
    expect(state.isAuthenticated).toBe(false)
    expect(state.isLoading).toBe(false)
  })

  it('updates isLoading properly', () => {
    useAuthStore.getState().setIsLoading(false)
    expect(useAuthStore.getState().isLoading).toBe(false)
  })
})
