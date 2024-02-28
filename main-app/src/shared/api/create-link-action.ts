'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import action from '@/shared/lib/safe-action'

const scheme = z.object({
  domainUid: z.string().uuid(),
  title: z.string().optional().or(z.literal('')),
  subdomain: z.string().optional().or(z.literal('')),
  url: z.string().url(),
  password: z.string().optional().or(z.literal('')),
})

const createLink = action(
  scheme,
  async ({ domainUid, title, subdomain, url, password }) => {
    try {
      const session = await auth()
      const response = await fetch(`${envServer.BACKEND_URL}/links`, {
        body: JSON.stringify({
          domainUid,
          title,
          subdomain,
          url,
          password,
        }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        method: 'POST',
        cache: 'no-store',
      })
      if (!response.ok) {
        console.log(await response.json())
        throw new Error(await response.json())
      }
      revalidatePath('/main')
      return { success: 'Successful request' }
    } catch (error) {
      return { failure: `Get error ${error}` }
    }
  }
)

export default createLink
