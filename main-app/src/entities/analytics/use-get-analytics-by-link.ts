'use client'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import getAnalyticsByLink from './get-analytics-by-link'
import { PeriodsEnum } from './periods-enum'

const useGetAnalyticsByLink = (period: PeriodsEnum) => {
  const searchParams = useSearchParams()
  const linkUid = searchParams.get('linkUid') ?? ''
  return useQuery({
    queryFn: async () => getAnalyticsByLink(linkUid, period),
    queryKey: ['analytics', linkUid, period],
  })
}

export default useGetAnalyticsByLink
