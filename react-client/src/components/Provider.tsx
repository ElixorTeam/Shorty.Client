'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider enableSystem attribute="class">
      {children}
    </ThemeProvider>
  )
}
