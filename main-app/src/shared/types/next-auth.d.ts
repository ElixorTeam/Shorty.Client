import 'next-auth'
import { type DefaultSession } from 'next-auth'

export type ExtendedUser = DefaultSession['user'] & {
  role: RoleType
}

export type RoleType = 'admin' | 'user'

declare module 'next-auth/jwt' {
  interface JWT {
    idToken?: string
    accessToken?: string
    refreshToken?: string
    expiresAt?: number
    role: RoleType
  }
}

declare module 'next-auth' {
  interface Session {
    user: ExtendedUser
    idToken?: string
  }

  interface Account {
    role: RoleType
  }
}
