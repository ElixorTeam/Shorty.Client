'use server'

import { type RecordType } from '@/entities/record/record-type'
import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables/env-server'

const getAllRecords = async (): Promise<RecordType[]> => {
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

export default getAllRecords
