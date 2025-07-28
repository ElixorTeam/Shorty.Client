'use server'

import { headers } from 'next/headers'
import hash from 'object-hash'

import { config } from '@/shared/config'

import {
  RedirectResponseType,
  RedirectType,
  RedirectTypesEnum,
} from './redirect-type'

const getRedirectByUrlPath = async (path: string): Promise<RedirectType> => {
  const userHeaders = await headers()
  const host = userHeaders.get('host') ?? ''
  const subdomain = host.includes('.') ? host.split('.')[0] : ''

  const url = new URL(`${config.API_URL}/redirects/link`)
  url.searchParams.append('domain', process.env.REDIRECT_DOMAIN as string)
  if (path) url.searchParams.append('path', path)
  if (subdomain) url.searchParams.append('subdomain', subdomain)

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
  if (data.password) data.password = hash(data.password)
  return data
}

export default getRedirectByUrlPath
