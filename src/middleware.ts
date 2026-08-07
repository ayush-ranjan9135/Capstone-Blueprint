import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// We have to define constants locally in middleware if they are not edge-compatible, 
// or we can just import them if they are pure constants. 
import { AUTH_COOKIE_NAME, ROUTES } from '@/lib/constants'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE_NAME)?.value
  const isAuthRoute = request.nextUrl.pathname === ROUTES.LOGIN || request.nextUrl.pathname === ROUTES.REGISTER

  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url))
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL(ROUTES.DASHBOARD, request.url))
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
