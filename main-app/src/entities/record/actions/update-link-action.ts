'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import action from '@/shared/lib/safe-action'

import { type RecordType } from '../record-type'

const scheme = z.object({
  uid: z.string().uuid(),
  tag: z.string().optional().or(z.literal('')),
  title: z.string().optional().or(z.literal('')),
  password: z.string().optional().or(z.literal('')),
})

const updateLink = action(scheme, async ({ uid, title, password, tag }) => {
  try {
    const session = await auth()
    const response = await fetch(`${envServer.BACKEND_URL}/links/${uid}`, {
      body: JSON.stringify({
        title,
        tags: [tag],
        password: password || undefined,
      }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.accessToken}`,
      },
      method: 'PUT',
      cache: 'no-store',
    })
    const text = await response.json()
    if (!response.ok) {
      if (response.status === 409)
        return { failure: 'Error: An object with such data already exists' }
      if (response.status === 400)
        return { failure: 'Error: Check the correctness of the data' }
      return { failure: `Unexpected error: Try again` }
    }
    revalidatePath('/main')
    return { data: text as RecordType }
  } catch (error) {
    return { failure: `Get error ${error}` }
  }
})

export default updateLink
