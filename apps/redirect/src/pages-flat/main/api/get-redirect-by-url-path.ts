'use server'

import { config } from '@/shared/config'

import { textToSha256 } from '../lib/hash'
import {
  RedirectResponseType,
  RedirectType,
  RedirectTypesEnum,
} from './redirect-type'

const getRedirectByUrlPath = async (path: string): Promise<RedirectType> => {
  const url = new URL(`${config.API_BASE_URL}/redirects/link`)
  url.searchParams.append('domain', config.REDIRECT_DOMAIN as string)
  if (path) url.searchParams.append('path', path)

  console.log(url)

  const response = await fetch(url)
  if (!response.ok) throw new Error(await response.text())

  const responseData = (await response.json()) as RedirectResponseType
  const data: RedirectType = {
    ...responseData,
    type:
      responseData.urls.length > 1
        ? RedirectTypesEnum.GROUP
        : RedirectTypesEnum.SINGLE,
  }
  if (data.password) data.password = await textToSha256(data.password)
  return data
}

export default getRedirectByUrlPath
