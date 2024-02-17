import { JWT } from '@auth/core/jwt'
import { TokenSet } from '@auth/core/types'
import NextAuth, { Session } from 'next-auth'
import keycloak from 'next-auth/providers/keycloak'

import envServer from '@/lib/envServer'

const getProtocolUrl = () =>
  `${envServer.KEYCLOAK_BASE_URL}/realms/${envServer.KEYCLOAK_REALM}/protocol/openid-connect`

const requestRefreshOfAccessToken = (token: JWT) =>
  fetch(`${getProtocolUrl()}/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: envServer.KEYCLOAK_CLIENT_ID,
      client_secret: envServer.KEYCLOAK_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: token.refreshToken ?? '',
    }),
    method: 'POST',
    cache: 'no-store',
  })

const requestSessionLogout = (idToken: string) =>
  fetch(`${getProtocolUrl()}/logout`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      id_token_hint: idToken,
    }),
    method: 'POST',
    cache: 'no-store',
  })

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
        currentToken.role = account.role
        currentToken.idToken = account.id_token
        currentToken.accessToken = account.access_token
        currentToken.refreshToken = account.refresh_token
        currentToken.expiresAt = account.expires_at
        return currentToken
      }

      if (Date.now() < currentToken.expiresAt! * 1000 - 15 * 1000)
        return currentToken

      try {
        const response = await requestRefreshOfAccessToken(currentToken)
        const tokens: TokenSet = await response.json()
        if (!response.ok) throw new Error(JSON.stringify(tokens))
        const updatedToken: JWT = {
          ...currentToken,
          idToken: currentToken.idToken,
          accessToken: currentToken.accessToken,
          expiresAt: Math.floor(
            Date.now() / 1000 + (tokens.expires_in as number)
          ),
          refreshToken: tokens.refresh_token ?? currentToken.refreshToken,
        }
        return updatedToken
      } catch (error) {
        console.log(`can not refresh access token ${error}`)
        return { ...currentToken, error: 'RefreshAccessTokenError' }
      }
    },
    async session({ session, token }) {
      const currentSession = { ...session } as Session
      const currentToken = { ...token } as JWT
      currentSession.idToken = currentToken.idToken
      currentSession.user.role = currentToken.role as 'admin' | 'user'
      return currentSession
    },
  },
  events: {
    async signOut(token) {
      try {
        // @ts-ignore
        const currentToken = { ...token.token } as JWT
        const response = await requestSessionLogout(currentToken.idToken ?? '')
        if (!response.ok)
          throw new Error(JSON.stringify(currentToken.idToken ?? ''))
      } catch (error) {
        console.log(`can not log out from session ${error}`)
      }
    },
  },
})
