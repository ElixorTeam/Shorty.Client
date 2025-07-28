import '@repo/ui/global.css'

import { Toaster } from '@repo/ui/sonner'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { type ReactNode } from 'react'

import { auth } from '@/shared/auth'
import { Providers } from '@/shared/providers'

const fontSans = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
})

const fontMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
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
        className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}
      >
        <Providers session={session}>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
