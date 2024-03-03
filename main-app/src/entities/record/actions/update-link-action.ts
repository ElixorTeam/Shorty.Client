'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import action from '@/shared/lib/safe-action'

import { type RecordType } from '../record-type'

const scheme = z.object({
  uid: z.string().uuid(),
  title: z.string().optional().or(z.literal('')),
  password: z.string().optional().or(z.literal('')),
})

const updateLink = action(scheme, async ({ uid, title, password }) => {
  try {
    const session = await auth()
    const response = await fetch(`${envServer.BACKEND_URL}/links/${uid}`, {
      body: JSON.stringify({
        title,
        password,
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
    if (!response.ok) return { failure: `Get error ${text.error}` }
    revalidatePath('/main')
    return { data: text as RecordType }
  } catch (error) {
    return { failure: `Get error ${error}` }
  }
})

export default updateLink
