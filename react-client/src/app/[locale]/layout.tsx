import './globals.css'
import Provider from '@/components/Provider'
import { useLocale } from 'next-intl'
import { notFound } from 'next/navigation'
import { ReactNode } from 'react'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Shorty',
  description: 'Short your links'
}

export default function RootLayout({
  children,
  params
}: {
  children: ReactNode
  params: { locale: string }
}) {
  const locale = useLocale()

  if (params.locale !== locale) {
    notFound()
  }

  return (
    <html lang={params.locale}>
      <body className="min-h-screen bg-white text-black antialiased dark:bg-[#23212e] dark:text-white">
        <Provider>{children}</Provider>
        <Toaster position="bottom-right" />
      </body>
    </html>
  )
}
