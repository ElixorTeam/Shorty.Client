import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

import { auth } from '@/shared/auth'

import globalConfig from './shared/config'

const publicRoutes = new Set(['/'])
const apiAuthPrefix = '/api/auth'
const adminPrefix = '/admin'

export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const authResponse = Response.redirect(new URL('/api/auth/signin', nextUrl))
  const session = await getToken({ req, secret: globalConfig.AUTH_SECRET })

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isAdminRoute = nextUrl.pathname.startsWith(adminPrefix)
  const isPublicRoute = publicRoutes.has(nextUrl.pathname)
  const isAdmin = !!session?.roles.find((x) => x == 'admin')
  const isTokenExpire = !!session?.error

  if (isAdminRoute && !isAdmin)
    return NextResponse.redirect(new URL('/', req.url))
  if (isApiAuthRoute) return undefined
  if (isTokenExpire) return authResponse
  if (!isPublicRoute && !isLoggedIn) return authResponse
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
