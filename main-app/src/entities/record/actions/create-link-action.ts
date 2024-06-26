'use server'

import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import action from '@/shared/lib/safe-action'

import { RecordResponseType } from '../record-type'
import { RecordTypesEnum } from '../record-types-enum'

const scheme = z.object({
  title: z.string().min(2).optional().or(z.literal('')),
  urls: z.string().url().array().max(5).min(1),
  path: z.string().min(2).max(16),
  domainUid: z.string().uuid(),
  subdomainUid: z.string().optional().or(z.literal('')),
  password: z.string().optional().or(z.literal('')),
})

const createLink = action(
  scheme,
  async ({ domainUid, title, subdomainUid, urls, password, path }) => {
    try {
      const session = await auth()
      const body = JSON.stringify({
        title: title || 'Untitled',
        path,
        urls,
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
      const responseData = (await response.json()) as {
        data: RecordResponseType
      }
      const { data } = responseData
      return {
        ...data,
        type:
          data.urls.length > 1 ? RecordTypesEnum.GROUP : RecordTypesEnum.SINGLE,
      }
    } catch (error) {
      return { failure: `Get error ${error}` }
    }
  }
)

export default createLink
