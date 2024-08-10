'use server'

import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import actionClient from '@/shared/lib/safe-action'

import { type SubdomainType } from '../subdomain-type'

const schema = z.object({
  value: z.string().min(2).max(16),
  domainUid: z.string().uuid(),
})

const createSubdomainAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { value, domainUid } }) => {
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
          Authorization: `Bearer ${session?.accessToken ?? ''}`,
        },
        method: 'POST',
        cache: 'no-store',
      })
      if (!response.ok) return { failure: `Unexpected error: Try again` }
      const responseData = (await response.json()) as { data: SubdomainType }
      return { data: responseData.data }
    } catch {
      return { failure: 'Get error' }
    }
  })

export default createSubdomainAction
