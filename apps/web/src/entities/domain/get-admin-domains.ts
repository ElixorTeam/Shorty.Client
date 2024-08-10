'use server'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'

import { DomainType } from './domain-type'

const getAdminDomains = async (): Promise<DomainType[]> => {
  const session = await auth()
  const response = await fetch(`${envServer.BACKEND_URL}/domains`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken ?? ''}`,
    },
    method: 'GET',
  })
  if (!response.ok) throw new Error('Can not access data')
  const responseData = (await response.json()) as { data: DomainType[] }
  return responseData.data
}

export default getAdminDomains
