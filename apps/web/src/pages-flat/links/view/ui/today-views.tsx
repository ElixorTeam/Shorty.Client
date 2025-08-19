'use client'

import { Badge } from '@repo/ui/badge'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card'
import { ChartConfig, ChartContainer } from '@repo/ui/chart'
import {
  SquareChartGanttIcon,
  TrendingDownIcon,
  TrendingUpIcon,
} from 'lucide-react'
import { Area, AreaChart } from 'recharts'

import { useGetLinkViews } from '@/entities/link'

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'var(--primary)',
  },
  subscription: {
    label: 'Subscriptions',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export function TodayViews({ linkUid }: { linkUid: string }) {
  const { data: views } = useGetLinkViews({
    linkUid,
    timeRange: 'Week',
  })

  const todayDate = new Date().toISOString().slice(0, 10)
  const yesterdayDate = new Date(Date.now() - 86400000)
    .toISOString()
    .slice(0, 10)

  const today = views?.find((v) => v.label === todayDate)?.value ?? 0
  const yesterday = views?.find((v) => v.label === yesterdayDate)?.value ?? 0

  const diff = today - yesterday
  const percentChange = yesterday === 0 ? 100 : (diff / yesterday) * 100
  const isUp = diff > 0
  return (
    <Card className="@container/card gap-0 overflow-hidden py-0">
      <CardHeader className="dark:bg-secondary/50 mb-3 border-b px-4 pt-2 [.border-b]:pb-0.5">
        <CardDescription className="flex items-center gap-1.5">
          <SquareChartGanttIcon className="size-3.5" />
          <span>Today views</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col p-0">
        <div className="size-full grow px-4 pt-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-3xl">+{today.toString()}</CardTitle>
            <CardAction>
              <Badge variant="outline" className="flex items-center gap-1">
                {isUp ? (
                  <TrendingUpIcon className="size-4 text-green-600" />
                ) : (
                  <TrendingDownIcon className="size-4 text-red-600" />
                )}
                {`${isUp ? '+' : ''}${percentChange.toFixed(1)}%`}
              </Badge>
            </CardAction>
          </div>

          <CardDescription>In comparison to yesterday</CardDescription>
        </div>
        <ChartContainer
          config={chartConfig}
          className="size-full max-h-[130px]"
        >
          <AreaChart
            data={views}
            margin={{
              left: 0,
              right: 0,
            }}
          >
            <Area
              dataKey="value"
              fill="var(--color-subscription)"
              fillOpacity={0.05}
              stroke="var(--color-subscription)"
              strokeWidth={2}
              type="monotone"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
