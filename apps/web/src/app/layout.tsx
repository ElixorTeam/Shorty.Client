import '@repo/ui/global.css'

import { Toaster } from '@repo/ui/toaster'
import { cn } from '@repo/ui/lib/utils'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { PublicEnvScript } from 'next-runtime-env'
import { ReactNode } from 'react'

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
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body
        className={cn(
          'bg-background min-h-screen overscroll-none font-sans antialiased',
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
