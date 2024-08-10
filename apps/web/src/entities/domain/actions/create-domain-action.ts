'use server'

import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import actionClient from '@/shared/lib/safe-action'

import { type DomainType } from '../domain-type'

const schema = z.object({
  value: z.string(),
})

const createDomain = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { value } }) => {
    try {
      const session = await auth()
      const body = JSON.stringify({ value })
      const response = await fetch(`${envServer.BACKEND_URL}/domains`, {
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken ?? ''}`,
        },
        method: 'POST',
        cache: 'no-store',
      })
      if (!response.ok) {
        if (response.status === 409)
          return { failure: 'Error: An object with such data already exists' }
        if (response.status === 400)
          return { failure: 'Error: Check the correctness of the data' }
        return { failure: `Unexpected error: Try again` }
      }
      const responseData = (await response.json()) as { data: DomainType }
      return { data: responseData.data }
    } catch {
      return { failure: 'Get error' }
    }
  })

export default createDomain
