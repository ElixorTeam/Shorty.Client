import ky from 'ky'
import NextAuth from 'next-auth'
import { JWT } from 'next-auth/jwt'
import keycloak from 'next-auth/providers/keycloak'

import authConfig from '@/auth.config'
import envServer from '@/lib/envServer'

type JWTResponse = {
  access_token: string
  token_type: string
  refresh_token: string
  expires_in: number
  id_token: string
}

export const getProtocolUrl = () =>
  `${envServer.KEYCLOAK_BASE_URL}/realms/${envServer.KEYCLOAK_REALM}/protocol/openid-connect`

export const getRefreshToken = async (token: JWT) => {
  const formData = new URLSearchParams()
  formData.append('client_id', envServer.KEYCLOAK_CLIENT_ID)
  formData.append('client_secret', envServer.KEYCLOAK_CLIENT_SECRET)
  formData.append('grant_type', 'refresh_token')
  formData.append('refresh_token', token.refresh_token)

  const response = await ky.post(`${getProtocolUrl()}/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formData,
  })

  if (!response.ok)
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }

  const newJWT: JWTResponse = await response.json()
  return {
    ...token,
    accessToken: newJWT.access_token,
    accessTokenExpired: Date.now() + (newJWT.expires_in - 15) * 1000,
    refreshToken: newJWT.refresh_token,
  }
}

export const sessionLogout = async (tokenId: string) =>
  ky.get(`${getProtocolUrl()}/logout?id_token_hint=${tokenId}`)

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  ...authConfig,
  providers: [
    keycloak({
      clientId: envServer.KEYCLOAK_CLIENT_ID,
      clientSecret: envServer.KEYCLOAK_CLIENT_SECRET,
      issuer: `${envServer.KEYCLOAK_BASE_URL}/realms/${envServer.KEYCLOAK_REALM}`,
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      const newToken = { ...token }
      // todo: jwt types, role
      if (account) {
        newToken.id_token = account.id_token
        newToken.access_token = account.access_token
        newToken.expires_at = Math.floor(
          Date.now() / 1000 + account.expires_in!
        )
        newToken.refresh_token = account.refresh_token
        return newToken
      }

      if (Date.now() < newToken.expires_at * 1000) return newToken

      return getRefreshToken(token)
    },
  },
  events: {
    async signOut(token) {
      await sessionLogout(token.token.id_token)
    },
  },
})
