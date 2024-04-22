import { signal } from '@preact-signals/safe-react'
import { v4 as uuidv4 } from 'uuid'

import { DomainType } from '@/entities/domain'
import { SubdomainType } from '@/entities/subdomain'

export const currentDomain = signal<DomainType>({
  uid: uuidv4(),
  value: '',
})

export const subdomainStub = signal<SubdomainType>({
  value: 'Unselected',
  uid: uuidv4(),
})

export const currentSubdomain = signal<SubdomainType>(subdomainStub.value)
