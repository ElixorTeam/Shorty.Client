'use server'

import { z } from 'zod'

import { type SubdomainType } from '@/entities/subdomain'
import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import action from '@/shared/lib/safe-action'

const scheme = z.object({
  value: z.string().min(2).max(16),
  domainUid: z.string().uuid(),
})

const createLink = action(scheme, async ({ value, domainUid }) => {
  try {
    const session = await auth()
    const body = JSON.stringify({
      value,
      domainUid,
    })
    const response = await fetch(`${envServer.BACKEND_URL}/user/subdomains`, {
      body,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      method: 'POST',
      cache: 'no-store',
    })
    if (!response.ok) return { failure: `Unexpected error: Try again` }
    const responseData = await response.json()
    const { data } = responseData
    return { data: data as SubdomainType }
  } catch (error) {
    return { failure: `Get error ${error}` }
  }
})

export default createLink