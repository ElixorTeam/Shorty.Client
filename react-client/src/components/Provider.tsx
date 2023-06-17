'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { index } from '@/redux'
import { Provider as ReduxProvider } from 'react-redux'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={index}>
      <ThemeProvider enableSystem attribute="class">
        {children}
      </ThemeProvider>
    </ReduxProvider>
  )
}
