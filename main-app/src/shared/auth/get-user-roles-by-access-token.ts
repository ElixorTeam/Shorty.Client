import { decodeToken } from 'react-jwt'

import { RoleType } from './next-auth'

const CLIENT_NAME = 'shorty-client'

type DecodedToken = {
  resource_access: {
    [CLIENT_NAME]: {
      roles: RoleType[]
    }
  }
}

const getUserRolesByAccessToken = (accessToken: string): RoleType[] => {
  const decodedToken = decodeToken<DecodedToken>(accessToken)
  if (
    decodedToken &&
    decodedToken.resource_access &&
    decodedToken.resource_access[CLIENT_NAME]
  )
    return decodedToken.resource_access[CLIENT_NAME].roles
  return ['user']
}

export default getUserRolesByAccessToken
