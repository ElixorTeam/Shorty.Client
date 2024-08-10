'use server'

import { SubdomainResponseObjectType } from '@/entities/subdomain'
import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'

import { DomainType } from './domain-type'

const getDomains = async (): Promise<DomainType[]> => {
  const session = await auth()
  const response = await fetch(`${envServer.BACKEND_URL}/user/subdomains`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken ?? ''}`,
    },
    method: 'GET',
  })
  if (!response.ok) throw new Error('Can not access data')
  const responseData = (await response.json()) as {
    data: SubdomainResponseObjectType[]
  }
  return responseData.data.map((domain) => ({
    uid: domain.domainUid,
    value: domain.domainValue,
  }))
}

export default getDomains
