import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { PublicEnvScript } from 'next-runtime-env'
import { ReactNode } from 'react'

import './styles.css'
import { auth } from '@/auth'
import SessionProvider from '@/features/providers/session-provider'
import ThemeProvider from '@/features/providers/theme-provider'

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
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
