'use client'

import { useEffect } from 'react'
import { auth } from '@/lib/firebase/client'
import { useAuthStore } from '@/stores/authStore'
import { onAuthStateChanged } from 'firebase/auth'
import { useRouter, usePathname } from 'next/navigation'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setAuth, isLoading } = useAuthStore()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setAuth(user)
      
      if (user) {
        const token = await user.getIdToken()
        document.cookie = `firebase-auth-token=${token}; path=/; max-age=3600; SameSite=Strict`
      } else {
        document.cookie = `firebase-auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`
      }
      
      const isAuthRoute = pathname === '/login' || pathname === '/register'
      if (!user && !isAuthRoute && pathname !== '/') {
        router.push('/login')
      } else if (user && isAuthRoute) {
        router.push('/dashboard')
      }
    })

    return () => unsubscribe()
  }, [setAuth, router, pathname])

  return (
    <>
      {isLoading && pathname !== '/login' && pathname !== '/register' ? (
        <div className="min-h-screen flex items-center justify-center bg-base text-primary">
          <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        children
      )}
    </>
  )
}
