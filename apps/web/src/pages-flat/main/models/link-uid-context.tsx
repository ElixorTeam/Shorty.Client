'use client'

import { createContext, useContext } from 'react'

const LinkUidContext = createContext<string>('')

export function LinkUidProvider({
  children,
  value,
}: Readonly<{ children: React.ReactNode; value: string }>) {
  return (
    <LinkUidContext.Provider value={value}>{children}</LinkUidContext.Provider>
  )
}

export function useLinkUidContext() {
  const ctx = useContext(LinkUidContext)
  if (!ctx)
    throw new Error('useFormContext must be used within LinkUidProvider')
  return ctx
}
