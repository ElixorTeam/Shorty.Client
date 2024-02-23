'use server'

import { ApiRecordType } from '@/shared/api/api-record-type'
import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables/env-server'

const getRecords = async (): Promise<ApiRecordType[]> => {
  const session = await auth()
  const records = await fetch(`${envServer.BACKEND_URL}/links`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    method: 'GET',
  })
  if (!records.ok) throw new Error('Can not access data')
  return records.json()
}

export default getRecords
