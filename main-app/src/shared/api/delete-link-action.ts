'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import action from '@/shared/lib/safe-action'

const scheme = z.object({
  linkUid: z.string().uuid(),
})

const deleteLink = action(scheme, async ({ linkUid }) => {
  try {
    const session = await auth()
    const response = await fetch(`${envServer.BACKEND_URL}/links/${linkUid}`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      method: 'DELETE',
      cache: 'no-store',
    })
    if (!response.ok) throw new Error(response.statusText)
    revalidatePath('/main')
    return { success: 'Link is deleted' }
  } catch (error) {
    return { failure: `Get error ${error}` }
  }
})

export default deleteLink
