import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('firebase-auth-token')?.value
  const isAuthRoute = request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/register'

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*', 
    '/profile/:path*', 
    '/settings/:path*', 
    '/notifications/:path*', 
    '/login', 
    '/register'
  ],
}
