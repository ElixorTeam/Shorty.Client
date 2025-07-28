import { SidebarProvider } from '@repo/ui/sidebar'
import { Session } from 'next-auth'

import { QueryProvider } from './query-provider'
import { SessionProvider } from './session-provider'
import { ThemeProvider } from './theme-provider'

export function Providers({
  children,
  session,
}: Readonly<{
  children: React.ReactNode
  session: Session | null
}>) {
  return (
    <SessionProvider session={session}>
      <QueryProvider>
        <ThemeProvider>
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>
      </QueryProvider>
    </SessionProvider>
  )
}
