'use server'

import { DomainType } from '@/entities/domain/domain-type'
import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'

const getDomains = async (): Promise<DomainType[]> => {
  const session = await auth()
  const response = await fetch(`${envServer.BACKEND_URL}/domains`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    method: 'GET',
  })
  if (!response.ok) throw new Error('Can not access data')
  return response.json()
}

export default getDomains
