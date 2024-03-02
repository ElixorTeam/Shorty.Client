'use server'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import { DomainType } from '@/shared/types/domain-type'

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