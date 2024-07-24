import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { PublicEnvScript } from 'next-runtime-env'
import { ReactNode } from 'react'

import './styles.css'
import { auth } from '@/shared/auth'
import cn from '@/shared/lib/tailwind-merge'
import QueryProvider from '@/shared/providers/query-provider'
import SessionProvider from '@/shared/providers/session-provider'
import ThemeProvider from '@/shared/providers/theme-provider'
import Toaster from '@/shared/ui/toaster'

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
