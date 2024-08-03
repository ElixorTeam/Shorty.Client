'use server'

import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import actionClient from '@/shared/lib/safe-action'

const schema = z.object({
  linkUid: z.string().uuid(),
})

const deleteLinkAnalytics = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { linkUid } }) => {
    try {
      const session = await auth()
      const response = await fetch(
        `${envServer.BACKEND_URL}/user/links/${linkUid}/analytics`,
        {
          headers: {
            Authorization: `Bearer ${session?.accessToken}`,
          },
          method: 'DELETE',
          cache: 'no-store',
        }
      )
      if (!response.ok) {
        const text = await response.json()
        return { failure: `Get error ${text.error}` }
      }
      return { success: 'Analytics is reseted' }
    } catch (error) {
      return { failure: `Get error ${error}` }
    }
  })

export default deleteLinkAnalytics
