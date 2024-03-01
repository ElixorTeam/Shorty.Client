'use server'

import { ApiRecordType } from '@/shared/api/api-record-type'
import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables/env-server'

const getCurrentRecord = async (linkUid: string): Promise<ApiRecordType> => {
  const session = await auth()
  const records = await fetch(`${envServer.BACKEND_URL}/links/${linkUid}`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    method: 'GET',
  })
  if (!records.ok) throw new Error('Can not access data')
  return records.json()
}

export default getCurrentRecord
