import { signal } from '@preact-signals/safe-react'
import { v4 as uuidv4 } from 'uuid'

import { SubdomainType } from '@/entities/subdomain'

export const subdomainStub = {
  value: 'Unselected',
  uid: uuidv4(),
}

export const currentSubdomain = signal<SubdomainType>({
  value: 'Unselected',
  uid: uuidv4(),
})
