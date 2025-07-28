'use client'

import { QueryClientProvider } from '@tanstack/react-query'

import { queryClient } from '../api/query-client'

export function QueryProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
