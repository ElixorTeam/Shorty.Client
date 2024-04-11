'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import action from '@/shared/lib/safe-action'

import { type RecordType } from '../record-type'

const scheme = z.object({
  title: z.string().min(2).optional().or(z.literal('')),
  url: z.string().url(),
  path: z.string().min(2).max(16),
  domainUid: z.string().uuid(),
  subdomainUid: z.string().optional().or(z.literal('')),
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
  async ({ domainUid, title, subdomainUid, url, password, path }) => {
    try {
      const session = await auth()
      const body = JSON.stringify({
        title: title || 'Untitled',
        path,
        url,
        subdomainUid: subdomainUid || undefined,
        domainUid,
        tags: [],
        password: password || undefined,
      })
      const response = await fetch(`${envServer.BACKEND_URL}/user/links`, {
        body,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session?.accessToken}`,
        },
        method: 'POST',
        cache: 'no-store',
      })
      if (!response.ok) {
        if (response.status === 409)
          return { failure: 'Error: An object with such data already exists' }
        if (response.status === 400)
          return { failure: 'Error: Check the correctness of the data' }
        return { failure: `Unexpected error: Try again` }
      }
      const responseData = await response.json()
      const { data } = responseData
      revalidatePath('/main')
      return { data: data as RecordType }
    } catch (error) {
      return { failure: `Get error ${error}` }
    }
  }
)

export default createLink
