import { decodeToken } from 'react-jwt'

import { RoleType } from './next-auth'

const getUserRolesByAccessToken = (accessToken: string): RoleType[] => {
  try {
    const decodedToken = decodeToken(accessToken) as any
    return decodedToken.resource_access['shorty-client'].roles
  } catch {
    return ['user']
  }
}

export default getUserRolesByAccessToken
