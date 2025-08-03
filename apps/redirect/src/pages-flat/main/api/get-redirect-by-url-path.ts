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
  url.searchParams.append('domain', config.REDIRECT_DOMAIN)
  url.searchParams.append('path', path)

  const response = await fetch(url)
  if (!response.ok) throw new Error(await response.text())

  const responseData = (await response.json()) as RedirectResponseType
  return {
    ...responseData,
    password: responseData.password
      ? await textToSha256(responseData.password)
      : null,
    type:
      responseData.urls.length > 1
        ? RedirectTypesEnum.GROUP
        : RedirectTypesEnum.SINGLE,
  }
}

export default getRedirectByUrlPath
