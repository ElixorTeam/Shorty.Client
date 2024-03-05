import envServer from '@/shared/lib/env-variables'

import getKeycloakProtocolUrl from './get-keycloak-protocol-url'

const reqAccessByRefreshToken = (refreshToken: string) =>
  fetch(`${getKeycloakProtocolUrl()}/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: envServer.KEYCLOAK_CLIENT_ID,
      client_secret: envServer.KEYCLOAK_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    method: 'POST',
    cache: 'no-store',
  })

export default reqAccessByRefreshToken
