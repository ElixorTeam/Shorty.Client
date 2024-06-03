'use server'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'

import { RecordResponseType, type RecordType } from './record-type'
import { RecordTypesEnum } from './record-types-enum'

const getAllRecords = async (): Promise<RecordType[]> => {
  const session = await auth()
  const response = await fetch(`${envServer.BACKEND_URL}/user/links`, {
    headers: {
      Authorization: `Bearer ${session?.accessToken}`,
    },
    method: 'GET',
  })
  if (!response.ok) throw new Error('Can not access data')
  const responseData = (await response.json()) as { data: RecordResponseType[] }
  const { data } = responseData
  return data.map((record) => ({
    ...record,
    type:
      record.urls.length > 1 ? RecordTypesEnum.GROUP : RecordTypesEnum.SINGLE,
  }))
}

export default getAllRecords
