'use server'

import { validate } from 'uuid'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'

import { SubdomainType } from './subdomain-type'

const getAllSubdomains = async (
  domainUid: string
): Promise<SubdomainType[]> => {
  if (!validate(domainUid)) throw new Error('Unvalid domain uuid')

  const session = await auth()
  const url = new URL(`${envServer.BACKEND_URL}/user/subdomains`)
  url.searchParams.append('domainUid', domainUid)

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    method: 'GET',
  })

  if (!response.ok) {
    throw new Error('Can not access data')
  }
  const responseData = await response.json()
  const { data } = responseData
  return data
}

export default getAllSubdomains
