'use client'

import { Card, CardDescription, CardHeader, CardTitle } from '@repo/ui/card'

import { rqClient } from '@/shared/api/instance'

export function SectionCards({ linkUid }: { linkUid: string }) {
  const { data } = rqClient.useQuery('get', '/user/links/{id}/analytics', {
    params: { path: { id: linkUid }, query: { period: 'Year' } },
  })
  console.log(data)
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:px-6">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Total views</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {data?.data?.statistics.views}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Unique views</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {data?.data?.statistics.uniqueViews}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Mobile views</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {data?.data?.devicesData?.device?.find(
              (device) => device.label === 'Mobile'
            )?.value ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Desktop views</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {data?.data?.devicesData?.device?.find(
              (device) => device.label === 'Desktop'
            )?.value ?? 0}
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}
