'use server'

import { headers } from 'next/headers'
import { env } from 'next-runtime-env'
import hash from 'object-hash'

import envServer from '@/shared/lib/env-variables'

import { RedirectType } from './redirect-type'

const getRedirectByUrlPath = async (path: string): Promise<RedirectType> => {
  const userHeaders = headers()
  const host = userHeaders.get('host') ?? ''
  const subdomain = host && host.includes('.') ? host.split('.')[0] : ''

  const url = new URL(`${envServer.BACKEND_URL}/redirects/link`)
  url.searchParams.append('domain', env('DOMAIN') as string)
  if (path) url.searchParams.append('path', path)
  if (subdomain) url.searchParams.append('subdomain', subdomain)

  const response = await fetch(url, { headers: userHeaders, cache: 'no-store' })
  if (!response.ok) throw new Error('Can not access data')

  const responseData = await response.json()
  if (responseData.password) responseData.password = hash(responseData.password)
  return responseData
}

export default getRedirectByUrlPath
