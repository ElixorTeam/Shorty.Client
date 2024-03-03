'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { type RecordType } from '@/entities/record/record-type'
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
      const text = await response.json()
      if (!response.ok) return { failure: `Get error ${text.error}` }
      revalidatePath('/main')
      return { data: text as RecordType }
    } catch (error) {
      return { failure: `Get error ${error}` }
    }
  }
)

export default createLink