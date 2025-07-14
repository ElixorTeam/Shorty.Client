import { TokenSet } from '@auth/core/types'
import NextAuth from 'next-auth'
import keycloak from 'next-auth/providers/keycloak'

import config from '@/shared/config'

import getUserRolesByAccessToken from './requests/get-user-roles-by-access-token'
import reqAccessByRefreshToken from './requests/req-access-by-refresh-token'
import reqSessionLogout from './requests/req-session-logout'

const EXPIRES_COMPROMISE = 3 * 1000

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  trustHost: true,
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
      const currentToken = { ...token }

      if (account) {
        currentToken.idToken = account.id_token
        currentToken.accessToken = account.access_token
        currentToken.refreshToken = account.refresh_token
        currentToken.expiresAt = account.expires_at
        currentToken.roles = getUserRolesByAccessToken(
          account.access_token || ''
        )
        return currentToken
      }

      if (
        currentToken.expiresAt &&
        Date.now() < currentToken.expiresAt * 1000 - EXPIRES_COMPROMISE
      )
        return currentToken

      try {
        const response = await reqAccessByRefreshToken(
          currentToken.refreshToken || ''
        )
        const tokens = (await response.json()) as TokenSet
        if (!response.ok)
          return { ...currentToken, error: 'RefreshAccessTokenError' }
        return {
          ...currentToken,
          idToken: tokens.id_token,
          accessToken: tokens.access_token,
          expiresAt: tokens.expires_at,
          refreshToken: tokens.refresh_token || currentToken.refreshToken,
        }
      } catch {
        return { ...currentToken, error: 'RefreshAccessTokenError' }
      }
    },
    session({ session, token }) {
      const currentSession = { ...session }
      const currentToken = { ...token }
      currentSession.accessToken = currentToken.accessToken
      currentSession.user.roles = currentToken.roles
      return currentSession
    },
  },
  events: {
    async signOut(token) {
      try {
        if (!('token' in token)) return
        const currentToken = token.token
        await reqSessionLogout(currentToken?.idToken ?? '')
      } catch {
        // pass
      }
    },
  },
})
