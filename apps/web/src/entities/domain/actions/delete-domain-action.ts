'use server'

import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import actionClient from '@/shared/lib/safe-action'

const schema = z.object({
  uuid: z.string(),
})

const deleteDomain = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { uuid } }) => {
    try {
      const session = await auth()
      const response = await fetch(`${envServer.BACKEND_URL}/domains/${uuid}`, {
        headers: {
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
      return { success: 'Link is deleted' }
    } catch (error) {
      return { failure: `Get error ${error}` }
    }
  })

export default deleteDomain
