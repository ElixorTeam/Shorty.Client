import { TokenSet } from '@auth/core/types'
import NextAuth from 'next-auth'
import keycloak from 'next-auth/providers/keycloak'

import { config } from '@/shared/consts/config'

import reqAccessByRefreshToken from './api/req-access-by-refresh-token'
import reqSessionLogout from './api/req-session-logout'
import getUserRolesByAccessToken from './lib/get-user-roles-by-access-token'

const EXPIRES_COMPROMISE = 3 * 1000

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/api/auth',
  },
  providers: [
    keycloak({
      clientId: config.KEYCLOAK_CLIENT_ID,
      clientSecret: config.KEYCLOAK_CLIENT_SECRET,
      issuer: `${config.KEYCLOAK_BASE_URL}/realms/${config.KEYCLOAK_REALM}`,
      checks: [],
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account)
        return {
          ...token,
          id_token: account.id_token,
          access_token: account.access_token,
          refresh_token: account.refresh_token,
          expires_at: account.expires_at,
          roles: getUserRolesByAccessToken(account.access_token ?? ''),
        }

      if (
        token.expires_at &&
        Date.now() < token.expires_at * 1000 - EXPIRES_COMPROMISE
      )
        return token

      const response = await reqAccessByRefreshToken(token.refresh_token ?? '')

      if (response.status === 400 || response.status === 401) {
        console.error(await response.json())
        return { ...token, error: 'RefreshTokenError' }
      }

      try {
        const newToken = (await response.json()) as TokenSet
        return {
          ...token,
          id_token: newToken.id_token,
          access_token: newToken.access_token,
          refresh_token: newToken.refresh_token ?? token.refresh_token,
          expires_at: newToken.expires_at,
          roles: newToken.access_token
            ? getUserRolesByAccessToken(newToken.access_token)
            : token.roles,
        }
      } catch (error) {
        console.error(error)
        return {
          ...token,
          error: 'RefreshTokenError',
        }
      }
    },
    session({ session, token }) {
      return {
        ...session,
        access_token: token.access_token,
        user: {
          ...session.user,
          roles: token.roles,
        },
      }
    },
  },
  events: {
    async signOut(token) {
      try {
        if (!('token' in token)) return
        const currentToken = token.token
        await reqSessionLogout(currentToken?.id_token ?? '')
      } catch {
        // pass
      }
    },
  },
})
