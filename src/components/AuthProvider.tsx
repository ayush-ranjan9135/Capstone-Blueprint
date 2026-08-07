'use client'

import { useEffect } from 'react'
import { auth } from '@/lib/firebase/client'
import { useAuthStore } from '@/stores/authStore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation'

import { AUTH_COOKIE_NAME, ROUTES } from '@/lib/constants'

import { logger } from '@/lib/logger'

/**
 * Global Authentication Provider that syncs Firebase Auth state with Zustand and manages route guards.
 * It listens to onAuthStateChanged to set the user state and a secure HTTP-only-like cookie.
 * It also handles automatic redirection between public (login/register) and protected (dashboard) routes.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth, isLoading } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!auth) {
      setAuth(null)
      return
    }

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuth(user)
      
      try {
        if (user) {
          const token = await user.getIdToken()
          document.cookie = `${AUTH_COOKIE_NAME}=${token}; path=/; max-age=3600; SameSite=Strict`
          logger.info('User session active', { uid: user.uid })
        } else {
          document.cookie = `${AUTH_COOKIE_NAME}=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
          logger.info('User session cleared')
        }
      } catch (error) {
        logger.error('Failed to sync auth cookie', { error: String(error) })
      }
      
      const isAuthRoute = pathname === ROUTES.LOGIN || pathname === ROUTES.REGISTER
      if (!user && !isAuthRoute && pathname !== ROUTES.HOME) {
        logger.info('Redirecting unauthenticated user to login', { pathname })
        router.push(ROUTES.LOGIN)
      } else if (user && isAuthRoute) {
        logger.info('Redirecting authenticated user to dashboard')
        router.push(ROUTES.DASHBOARD)
      }
    })

    return () => unsubscribe()
  }, [setAuth, router, pathname])

  return (
    <>
      {isLoading && pathname !== ROUTES.LOGIN && pathname !== ROUTES.REGISTER ? (
        <div className="min-h-screen flex items-center justify-center bg-base text-primary">
          <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </>
  )
}
