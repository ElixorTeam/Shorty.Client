import { createApi } from '@reduxjs/toolkit/query/react'
import baseQueryWithAuth from '@/redux/baseQueryWithAuth'

type AnalyticItemType = {
  name: string
  value: number
}

type DayAnalyticsType = {
  date: string
  count: number
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
    }),
    getDayAnalytics: builder.query<DayAnalyticsType[], string>({
      query: uid => `links_analytics/time_line/${uid}`
    })
  })
})

export const { useGetLinkAnalyticsQuery, useGetDayAnalyticsQuery } = analyzeApi
