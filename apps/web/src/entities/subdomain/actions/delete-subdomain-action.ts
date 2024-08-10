'use server'

import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import actionClient from '@/shared/lib/safe-action'

const schema = z.object({
  uid: z.string().uuid(),
})

const deleteSubdomainAction = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { uid } }) => {
    try {
      const session = await auth()
      const response = await fetch(
        `${envServer.BACKEND_URL}/user/subdomains/${uid}`,
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken ?? ''}`,
          },
          method: 'DELETE',
          cache: 'no-store',
        }
      )

      if (!response.ok) {
        if (response.status === 409)
          return { failure: 'Error: Some links use this subdomain' }
        return { failure: 'Get error' }
      }

      return { success: 'Link is deleted' }
    } catch {
      return { failure: 'Get error' }
    }
  })

export default deleteSubdomainAction
