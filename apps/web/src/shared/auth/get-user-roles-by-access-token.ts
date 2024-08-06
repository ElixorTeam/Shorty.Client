import { jwtDecode } from 'jwt-decode'

import envServer from '../lib/env-variables'
import { RoleType } from './next-auth'

const CLIENT_NAME = envServer.KEYCLOAK_CLIENT_ID

type DecodedToken = {
  resource_access: Record<string, {
      roles: RoleType[]
    }>
}

const getUserRolesByAccessToken = (accessToken: string): RoleType[] => {
  const decodedToken = jwtDecode<DecodedToken>(accessToken)
  const clientRoles = decodedToken.resource_access[CLIENT_NAME]?.roles
  return clientRoles ? clientRoles : ['user']
}

export default getUserRolesByAccessToken
