'use server'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'

import { SubdomainResponseObjectType, SubdomainType } from './subdomain-type'

const getAllSubdomains = async (): Promise<SubdomainType[]> => {
  const session = await auth()
  const url = new URL(`${envServer.BACKEND_URL}/user/subdomains`)

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    method: 'GET',
  })

  if (!response.ok) throw new Error('Can not access data')
  const responseData = (await response.json()) as {
    data: SubdomainResponseObjectType[]
  }
  return responseData.data.flatMap((domain) =>
    domain.subdomains.map((subdomain) => ({
      ...subdomain,
      domainUid: domain.domainUid,
    }))
  )
}

export default getAllSubdomains
