import { getToken } from 'next-auth/jwt'

import { auth } from '@/auth'
import envServer from '@/lib/envServer'
import { apiAuthPrefix, publicRoutes } from '@/routes'

// @ts-ignore
export default auth(async (req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth
  const authResponse = Response.redirect(new URL('/api/auth/signin', nextUrl))

  // @ts-ignore
  const session = await getToken({ req, secret: envServer.AUTH_SECRET })

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname)
  const isTokenExpire = session?.error === 'RefreshAccessTokenError'

  if (isApiAuthRoute) return null
  if (isTokenExpire) return authResponse
  if (!isPublicRoute && !isLoggedIn) return authResponse

  return null
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
