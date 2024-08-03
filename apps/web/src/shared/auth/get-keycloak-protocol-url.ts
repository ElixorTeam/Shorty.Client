import envServer from '../lib/env-variables'

const getKeycloakProtocolUrl = () =>
  `${envServer.KEYCLOAK_BASE_URL}/realms/${envServer.KEYCLOAK_REALM}/protocol/openid-connect`

export default getKeycloakProtocolUrl
