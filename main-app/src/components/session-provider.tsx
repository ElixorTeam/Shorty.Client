'use client'

import type { Session } from 'next-auth'
import { SessionProvider as AuthProvider } from 'next-auth/react'
import { PropsWithChildren } from 'react'

export default function SessionProvider({
  children,
  session,
}: PropsWithChildren<{ session: Session }>) {
  return <AuthProvider session={session}>{children}</AuthProvider>
}
