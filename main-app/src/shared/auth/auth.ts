import { TokenSet } from '@auth/core/types'
import NextAuth, { Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import keycloak from 'next-auth/providers/keycloak'

import getUserRolesByAccessToken from '@/shared/auth/getUserRolesByAccessToken'
import reqAccessByRefreshToken from '@/shared/auth/reqAccessByRefreshToken'
import reqSessionLogout from '@/shared/auth/reqSessionLogout'
import envServer from '@/shared/lib/env-variables'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [
    keycloak({
      clientId: envServer.KEYCLOAK_CLIENT_ID,
      clientSecret: envServer.KEYCLOAK_CLIENT_SECRET,
      issuer: `${envServer.KEYCLOAK_BASE_URL}/realms/${envServer.KEYCLOAK_REALM}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const currentToken = { ...token } as JWT

      if (account) {
        currentToken.idToken = account.id_token
        currentToken.accessToken = account.access_token
        currentToken.refreshToken = account.refresh_token
        currentToken.expiresAt = account.expires_at
        currentToken.roles = getUserRolesByAccessToken(
          account.access_token ?? ''
        )
        return currentToken
      }

      if (Date.now() < currentToken.expiresAt! * 1000 - 15 * 1000)
        return currentToken

      try {
        const response = await reqAccessByRefreshToken(
          currentToken.refreshToken ?? ''
        )
        const tokens: TokenSet = await response.json()
        if (!response.ok) throw new Error(await response.text())
        return {
          ...currentToken,
          idToken: tokens.id_token,
          accessToken: tokens.access_token,
          expiresAt: tokens.expires_at,
          refreshToken: tokens.refresh_token ?? currentToken.refreshToken,
        }
      } catch (error) {
        console.log(`Error while refreshing access token: ${error}`)
        return { ...currentToken, error: 'RefreshAccessTokenError' }
      }
    },
    async session({ session, token }) {
      const currentSession = { ...session } as Session
      const currentToken = { ...token } as JWT
      currentSession.accessToken = currentToken.accessToken
      currentSession.user.roles = currentToken.roles
      return currentSession
    },
  },
  events: {
    async signOut(token) {
      try {
        // @ts-ignore
        const currentToken = { ...token.token } as JWT
        const response = await reqSessionLogout(currentToken.idToken ?? '')
        if (!response.ok) throw new Error(await response.text())
      } catch (error) {
        console.log(`Error while log out: ${error}`)
      }
    },
  },
})
