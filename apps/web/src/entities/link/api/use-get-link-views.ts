import { type ApiPaths, rqClient } from '@/shared/api'

const AnalyticsPeriod = {
  WEEK: 'Week',
  MONTH: 'Month',
  YEAR: 'Year',
} as const

const AnalyticsPeriodDays = {
  [AnalyticsPeriod.WEEK]: 7,
  [AnalyticsPeriod.MONTH]: 30,
  [AnalyticsPeriod.YEAR]: 365,
} as const

const useGetLinkViews = ({
  linkUid,
  timeRange,
}: {
  linkUid: string
  timeRange: ApiPaths['/user/links/{id}/analytics']['get']['parameters']['query']['period']
}) => {
  const { data: link } = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: linkUid } },
  })
  return rqClient.useQuery(
    'get',
    '/user/links/{id}/analytics',
    {
      params: { path: { id: linkUid }, query: { period: timeRange } },
    },
    {
      select: (data) => {
        if (data.data.viewsData.length === 0 || !link?.data.createDt) return []
        return parseAnalytics({
          views: data.data.viewsData,
          createDt: new Date(link.data.createDt),
          period: timeRange,
        })
      },
    }
  )
}

const parseAnalytics = ({
  views,
  createDt,
  period,
}: {
  views: { label: string; value: number }[]
  createDt: Date
  period: (typeof AnalyticsPeriod)[keyof typeof AnalyticsPeriod]
}) => {
  if (!views.length) return []

  const endDate = new Date()
  const daysToSubtract = AnalyticsPeriodDays[period]
  const rangeStart = new Date(endDate)
  rangeStart.setDate(endDate.getDate() - daysToSubtract + 1)
  const startDate = createDt > rangeStart ? createDt : rangeStart

  const viewsMap = new Map(views.map((view) => [view.label, view.value]))

  const result = []
  for (
    let current = new Date(startDate);
    current <= endDate;
    current.setDate(current.getDate() + 1)
  ) {
    const dateLabel = current.toISOString().slice(0, 10)
    result.push({
      label: dateLabel,
      value: viewsMap.get(dateLabel) ?? 0,
    })
  }

  return result
}

export { AnalyticsPeriod, useGetLinkViews }
