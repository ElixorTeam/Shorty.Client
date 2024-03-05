import { getToken } from 'next-auth/jwt'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'

const publicRoutes = new Set(['/'])
const apiAuthPrefix = '/api/auth'

// @ts-ignore
export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const authResponse = Response.redirect(new URL('/api/auth/signin', nextUrl))
  // @ts-ignore
  const session = await getToken({ req, secret: envServer.AUTH_SECRET })

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.has(nextUrl.pathname)
  const isTokenExpire = session?.error === 'RefreshAccessTokenError'

  // eslint-disable-next-line unicorn/no-useless-undefined
  if (isApiAuthRoute) return undefined
  if (isTokenExpire) return authResponse
  if (!isPublicRoute && !isLoggedIn) return authResponse
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
