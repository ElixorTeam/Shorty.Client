'use client'

import { ThemeProvider } from 'next-themes'
import SearchProvider from '@/components/SearchProvider'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider enableSystem attribute="class">
      <SearchProvider>{children}</SearchProvider>
    </ThemeProvider>
  )
}
