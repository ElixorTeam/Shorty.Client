declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string
    id_token: string
    refresh_token: string
    access_expires_at: number
    refresh_expires_at: number
    error: string
  }
}
