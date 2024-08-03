import 'next-auth'

import { type DefaultSession } from 'next-auth'

export type RoleType = 'admin' | 'user'

export type ExtendedUser = DefaultSession['user'] & {
  roles: RoleType[]
}

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    roles: RoleType[]
    error?: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
    accessToken?: string
  }
}
