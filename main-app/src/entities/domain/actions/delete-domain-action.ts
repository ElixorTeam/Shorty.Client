'use server'

import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import action from '@/shared/lib/safe-action'

import { type DomainType } from '../domain-type'

const scheme = z.object({
  uuid: z.string(),
})

const deleteDomain = action(scheme, async ({ uuid }) => {
  try {
    const session = await auth()
    const response = await fetch(`${envServer.BACKEND_URL}/domains/${uuid}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      method: 'DELETE',
      cache: 'no-store',
    })
    if (!response.ok) {
      if (response.status === 409)
        return { failure: 'Error: An object with such data already exists' }
      if (response.status === 400)
        return { failure: 'Error: Check the correctness of the data' }
      return { failure: `Unexpected error: Try again` }
    }
    const responseData = await response.json()
    const { data } = responseData
    return { data: data as DomainType }
  } catch (error) {
    return { failure: `Get error ${error}` }
  }
})

export default deleteDomain
