'use server'

import { auth } from '@/shared/auth'
import envServer from '@/shared/lib/env-variables'

import { AnalyticsType } from './analytics-type'
import { PeriodsEnum } from './periods-enum'

const getAnalyticsByLink = async (
  linkUid: string,
  period: PeriodsEnum
): Promise<AnalyticsType> => {
  const session = await auth()
  const response = await fetch(
    `${envServer.BACKEND_URL}/user/links/${linkUid}/analytics?period=${period}`,
    {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
      method: 'GET',
    }
  )
  if (!response.ok) throw new Error('Can not access data')
  const responseData = (await response.json()) as { data: AnalyticsType }
  const { data } = responseData
  console.log(data)
  console.log(data.devicesData)
  return data
}

export default getAnalyticsByLink
