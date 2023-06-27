import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithAuth from '@/redux/baseQueryWithAuth'

type AnalyticItemType = {
  name: string
  value: number
}

type ViewsAnalyticType = {
  total: number
  unique: number
  avg_day: number
}

type LinkAnalyticsResponse = {
  os: AnalyticItemType[]
  browsers: AnalyticItemType[]
  devices: AnalyticItemType[]
  views: ViewsAnalyticType
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
