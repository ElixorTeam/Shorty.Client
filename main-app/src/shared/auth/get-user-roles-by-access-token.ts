import { jwtDecode } from 'jwt-decode'

import { RoleType } from './next-auth'
import envServer from '../lib/env-variables'

const CLIENT_NAME = envServer.KEYCLOAK_CLIENT_ID

type DecodedToken = {
  resource_access: {
    [key: string]: {
      roles: RoleType[]
    }
  }
}

const getUserRolesByAccessToken = (accessToken: string): RoleType[] => {
  const decodedToken = jwtDecode<DecodedToken>(accessToken)
  if (
    decodedToken &&
    decodedToken.resource_access &&
    decodedToken.resource_access[CLIENT_NAME]
  )
    return decodedToken.resource_access[CLIENT_NAME].roles
  return ['user']
}

export default getUserRolesByAccessToken
