import { createContext, useContext, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { DomainType } from '@/entities/domain'
import { SubdomainType } from '@/entities/subdomain'

const initialDomain: DomainType = {
  uid: uuidv4(),
  value: '',
}

const initialSubdomain: SubdomainType = {
  value: 'Unselected',
  uid: uuidv4(),
  domainUid: '',
}

const FormContext = createContext<ReturnType<typeof useFormState> | null>(null)

function useFormState() {
  const [currentDomain, setCurrentDomain] = useState<DomainType>(initialDomain)
  const [currentSubdomain, setCurrentSubdomain] =
    useState<SubdomainType>(initialSubdomain)

  return {
    currentDomain,
    setCurrentDomain,
    currentSubdomain,
    setCurrentSubdomain,
    subdomainStub: initialSubdomain,
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
