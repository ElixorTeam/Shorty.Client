'use server'

import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import action from '@/shared/lib/safe-action'

const scheme = z.object({
  uid: z.string().uuid(),
})

const deleteSubdomainAction = action(scheme, async ({ uid }) => {
  try {
    const session = await auth()
    const response = await fetch(
      `${envServer.BACKEND_URL}/user/subdomains/${uid}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        method: 'DELETE',
        cache: 'no-store',
      }
    )

    if (!response.ok) {
      if (response.status === 409)
        return { failure: 'Error: Some links use this subdomain' }
      return { failure: await response.json() }
    }

    return { success: 'Link is deleted' }
  } catch (error) {
    return { failure: `Get error ${error}` }
  }
})

export default deleteSubdomainAction
