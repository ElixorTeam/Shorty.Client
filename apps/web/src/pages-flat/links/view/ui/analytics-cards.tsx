'use client'

import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui/card'

import { rqClient } from '@/shared/api'

export function AnalyticsCards({ linkUid }: Readonly<{ linkUid: string }>) {
  const { data } = rqClient.useQuery('get', '/user/links/{id}/analytics', {
    params: { path: { id: linkUid }, query: { period: 'Year' } },
  })
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total views</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.data.statistics.views}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Unique views</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.data.statistics.uniqueViews}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Mobile views</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.data.devicesData.device?.find(
              (device) => device.label === 'Mobile'
            )?.value ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Desktop views</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.data.devicesData.device?.find(
              (device) => device.label === 'Desktop'
            )?.value ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
