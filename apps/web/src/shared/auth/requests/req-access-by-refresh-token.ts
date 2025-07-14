import config from '@/shared/config'

import { KEYCLOAK_PROTOCOL_URL } from './keycloak-protocol-url'

const reqAccessByRefreshToken = (refreshToken: string) =>
  fetch(`${KEYCLOAK_PROTOCOL_URL}/token`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: config.KEYCLOAK_CLIENT_ID,
      client_secret: config.KEYCLOAK_CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
    method: 'POST',
    cache: 'no-store',
  })

export default reqAccessByRefreshToken
