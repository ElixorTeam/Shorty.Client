'use server'

import { z } from 'zod'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'
import actionClient from '@/shared/lib/safe-action'

import { RecordResponseType } from '../record-type'
import { RecordTypesEnum } from '../record-types-enum'

const schema = z.object({
  uid: z.string().uuid(),
  tag: z.string().optional().or(z.literal('')),
  title: z.string().optional().or(z.literal('')),
  password: z.string().optional().or(z.literal('')),
  isEnable: z.boolean(),
})

const updateLink = actionClient
  .schema(schema)
  .action(async ({ parsedInput: { uid, title, password, tag, isEnable } }) => {
    try {
      const session = await auth()
      const body = JSON.stringify({
        title,
        tags: [tag],
        isEnable,
        password: password || undefined,
      })
      const response = await fetch(
        `${envServer.BACKEND_URL}/user/links/${uid}`,
        {
          body,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.accessToken}`,
          },
          method: 'PUT',
          cache: 'no-store',
        }
      )
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
  })

export default updateLink
