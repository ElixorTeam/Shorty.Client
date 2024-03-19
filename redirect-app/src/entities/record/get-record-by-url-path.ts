'use server'

import { headers } from 'next/headers'

import envServer from '@/shared/lib/env-variables'

import { RecordType } from './record-type'

const getRecordByUrlPath = async (path: string): Promise<RecordType> => {
  const userHeaders = headers()
  const host = userHeaders.get('host') ?? ''
  const subdomain = host && host.includes('.') ? host.split('.')[0] : ''

  const url = new URL(`${envServer.BACKEND_URL}/links/url`)
  if (path) url.searchParams.append('path', path)
  if (subdomain) url.searchParams.append('subdomain', subdomain)

  const record = await fetch(url, {
    headers: userHeaders,
    method: 'GET',
  })

  if (!record.ok) throw new Error('Can not access data')
  return record.json()
}

export default getRecordByUrlPath
