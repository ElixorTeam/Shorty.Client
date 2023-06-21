'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { store } from '@/redux/store'
import { Provider as ReduxProvider } from 'react-redux'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider enableSystem attribute="class">
        {children}
      </ThemeProvider>
    </ReduxProvider>
  )
}
