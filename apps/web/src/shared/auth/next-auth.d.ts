import 'next-auth'

import { type DefaultSession } from 'next-auth'

export type RoleType = 'admin' | 'user'

export type ExtendedUser = DefaultSession['user'] & {
  roles: RoleType[]
}

declare module 'next-auth/jwt' {
  interface JWT {
    id_token?: string
    access_token?: string
    refresh_token?: string
    expires_at?: number
    roles: RoleType[]
    error?: 'RefreshTokenError'
  }
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
    access_token: string
    error?: 'RefreshTokenError'
  }
}
