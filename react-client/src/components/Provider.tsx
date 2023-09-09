'use client'

import { ThemeProvider } from 'next-themes'
import { ReactNode } from 'react'
import { Provider as ReduxProvider } from 'react-redux'
import { PersistGate } from 'reduxjs-toolkit-persist/integration/react'

import { persistor, store } from '@/redux/store'

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <ThemeProvider enableSystem attribute="class">
        <PersistGate persistor={persistor} loading={null}>
          {children}
        </PersistGate>
      </ThemeProvider>
    </ReduxProvider>
  )
}
