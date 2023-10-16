import './styles.css'
import { notFound } from 'next/navigation'
import { useLocale } from 'next-intl'
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Provider from '@/components/Provider'

export const metadata = {
  title: 'Shorty',
  description: 'Short your links',
}

export default function RootLayout({
  children,
  params,
}: {
  children: ReactNode
  params: { locale: string }
}) {
  if (params.locale !== useLocale()) notFound()
  return (
    <html lang={params.locale} suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
