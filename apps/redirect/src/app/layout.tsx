import '@repo/ui/global.css'

import { cn } from '@repo/ui/lib/utils'
import { Toaster } from '@repo/ui/sonner'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import React from 'react'

import Providers from '@/shared/providers'

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
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn('min-h-screen font-sans antialiased', fontSans.variable)}
      >
        <Providers>
          <main className="bg-sidebar flex h-screen w-screen items-center justify-center">
            {children}
          </main>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
