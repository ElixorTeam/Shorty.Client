'use client'

import { createContext, useContext, useState } from 'react'

import { DomainType } from '@/entities/domain'
import { SubdomainType } from '@/entities/subdomain'

const FormContext = createContext<ReturnType<typeof useFormState> | null>(null)

function useFormState() {
  const [currentDomain, setCurrentDomain] = useState<DomainType | undefined>()
  const [currentSubdomain, setCurrentSubdomain] = useState<
    SubdomainType | undefined
  >()

  return {
    currentDomain,
    setCurrentDomain,
    currentSubdomain,
    setCurrentSubdomain,
  }
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  return (
    <FormContext.Provider value={useFormState()}>
      {children}
    </FormContext.Provider>
  )
}

export function useFormContext() {
  const ctx = useContext(FormContext)
  if (!ctx) throw new Error('useFormContext must be used within FormProvider')
  return ctx
}
