'use server'

import { headers } from 'next/headers'
import hash from 'object-hash'

import envServer from '@/shared/lib/env-variables'

import { RedirectResponseType, RedirectType } from './redirect-type'
import { RedirectTypesEnum } from './redirect-types-enum'

const getRedirectByUrlPath = async (path: string): Promise<RedirectType> => {
  const userHeaders = await headers()
  const host = userHeaders.get('host') ?? ''
  const subdomain = host.includes('.') ? host.split('.')[0] : ''

  const url = new URL(`${envServer.BACKEND_URL}/redirects/link`)
  url.searchParams.append('domain', process.env.REDIRECT_DOMAIN as string)
  if (path) url.searchParams.append('path', path)
  if (subdomain) url.searchParams.append('subdomain', subdomain)

  const response = await fetch(url, { headers: userHeaders, cache: 'no-store' })
  if (!response.ok) throw new Error('Can not access data')

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
