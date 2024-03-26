'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import action from '@/shared/lib/safe-action'

import { type RecordType } from '../record-type'

const scheme = z.object({
  domainUid: z.string().uuid(),
  title: z.string().min(2).optional().or(z.literal('')),
  subdomain: z.string().optional().or(z.literal('')),
  url: z.string().url(),
  password: z.string().optional().or(z.literal('')),
})

// const getTitleOfWebsite = async (url: string): Promise<string> => {
//   try {
//     const response = await fetch(url)
//     const html = await response.text()
//     const parser = new DOMParser()
//     const doc = parser.parseFromString(html, 'text/html')
//     return doc.querySelector('title')?.textContent ?? ''
//   } catch (error) {
//     console.log(error)
//     return ''
//   }
// }

const createLink = action(
  scheme,
  async ({ domainUid, title, subdomain, url, password }) => {
    try {
      const session = await auth()
      const response = await fetch(`${envServer.BACKEND_URL}/links`, {
        body: JSON.stringify({
          title: title || 'Untitled',
          subdomain,
          domainUid,
          url,
          tags: [''],
          password: password || undefined,
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
