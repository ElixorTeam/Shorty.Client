import getKeycloakProtocolUrl from './getKeycloakProtocolUrl'

const reqSessionLogout = (idToken: string) =>
  fetch(`${getKeycloakProtocolUrl()}/logout`, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      id_token_hint: idToken,
    }),
    method: 'POST',
    cache: 'no-store',
  })

export default reqSessionLogout
