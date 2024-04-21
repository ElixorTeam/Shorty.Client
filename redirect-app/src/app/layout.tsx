import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import { PublicEnvScript } from 'next-runtime-env'
import './styles.css'
import { ReactNode } from 'react'

import cn from '@/shared/lib/tailwind-merge'
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

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <PublicEnvScript />
      </head>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
