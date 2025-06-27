import '@repo/ui/global.css'

import { cn } from '@repo/ui/lib/utils'
import { Toaster } from '@repo/ui/sonner'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { type ReactNode } from 'react'

import { auth } from '@/shared/auth'
import QueryProvider from '@/shared/providers/query-provider'
import SessionProvider from '@/shared/providers/session-provider'
import ThemeProvider from '@/shared/providers/theme-provider'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Shorty',
  description: 'App to short links',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  const session = await auth()
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen overscroll-none bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <SessionProvider session={session}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
              enableColorScheme
            >
              {children}
              <Toaster />
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
