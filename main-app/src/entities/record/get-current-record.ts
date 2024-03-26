'use server'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'

import { type RecordType } from './record-type'

const getCurrentRecord = async (linkUid: string): Promise<RecordType> => {
  const session = await auth()
  const response = await fetch(`${envServer.BACKEND_URL}/links/${linkUid}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    method: 'GET',
  })
  if (!response.ok) throw new Error('Can not access data')
  const responseData = await response.json()
  const { data } = responseData
  return data
}

export default getCurrentRecord
