import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithAuth from '@/redux/baseQueryWithAuth'

type AnalyticItemType = {
  name: string
  count: number
}

type LinkAnalyticsResponse = {
  os: AnalyticItemType[]
  browsers: AnalyticItemType[]
  device: AnalyticItemType[]
}

export const analyzeApi = createApi({
  reducerPath: 'analyzeApi',
  baseQuery: baseQueryWithAuth,
  endpoints: builder => ({
    getLinkAnalytics: builder.query<LinkAnalyticsResponse, string>({
      query: uid => `links_analytics/${uid}`
    })
  })
})

export const { useGetLinkAnalyticsQuery } = analyzeApi
