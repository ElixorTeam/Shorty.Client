import { KEYCLOAK_PROTOCOL_URL } from './keycloak-protocol-url'

const reqSessionLogout = (idToken: string) =>
  fetch(`${KEYCLOAK_PROTOCOL_URL}/logout`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      id_token_hint: idToken,
    }),
    method: 'POST',
    cache: 'no-store',
  })

export default reqSessionLogout
