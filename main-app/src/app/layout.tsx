import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PublicEnvScript } from 'next-runtime-env'
import { ReactNode } from 'react'

import './styles.css'
import { auth } from '@/shared/auth'
import { SessionProvider, ThemeProvider } from '@/shared/providers'
import QueryProvider from '@/shared/providers/query-provider'

const inter = Inter({ subsets: ['latin'] })

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
      <body className={inter.className}>
        <SessionProvider session={session}>
          <QueryProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
