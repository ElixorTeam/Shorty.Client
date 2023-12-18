import './styles.css'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import React, { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

import Provider from '@/components/Provider'
import { locales } from '@/utils/navigation'

export const metadata = {
  title: 'Shorty',
  description: 'Short your links',
}

export default function LocaleLayout({
  children,
  params: { locale },
}: {
  children: ReactNode
  params: { locale: string }
}) {
  if (!locales.includes(locale as any)) notFound()
  unstable_setRequestLocale(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body>
        <Provider>{children}</Provider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
