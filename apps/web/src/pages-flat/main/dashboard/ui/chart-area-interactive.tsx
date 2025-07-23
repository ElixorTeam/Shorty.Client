'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@repo/ui/chart'
import { useIsMobile } from '@repo/ui/hooks/use-mobile'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/select'
import { ToggleGroup, ToggleGroupItem } from '@repo/ui/toggle-group'
import * as React from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { rqClient } from '@/shared/api/instance'

import { useLinkUidContext } from '../../models/link-uid-context'

export const description = 'An interactive area chart'

const chartConfig = {
  value: {
    label: 'Visitors',
    color: 'var(--primary)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--primary)',
  },
} satisfies ChartConfig

export function ChartAreaInteractive() {
  const isMobile = useIsMobile()
  const linkUid = useLinkUidContext()
  const [timeRange, setTimeRange] = React.useState<'Month' | 'Week'>('Month')

  const { data: link } = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: linkUid } },
  })

  const { data } = rqClient.useQuery('get', '/user/links/{id}/analytics', {
    params: { path: { id: linkUid }, query: { period: timeRange } },
  })

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange('Week')
    }
  }, [isMobile])

  const filteredData = React.useMemo(() => {
    if (!data?.data?.viewsData || !link?.data?.createDt) return []

    const now = new Date()
    const createDate = new Date(link.data.createDt)
    const daysToSubtract = timeRange === 'Month' ? 30 : 7
    const rangeStart = new Date(now)
    rangeStart.setDate(rangeStart.getDate() - daysToSubtract + 1)
    const startDate = createDate > rangeStart ? createDate : rangeStart
    const endDate = now

    const fullRange: { label: string; value: number }[] = []
    const current = new Date(startDate)
    while (current <= endDate) {
      fullRange.push({
        label: current.toISOString().slice(0, 10), // YYYY-MM-DD
        value: 0,
      })
      current.setDate(current.getDate() + 1)
    }

    const realDataMap = new Map<string, number>()
    data.data.viewsData.forEach((item) => {
      realDataMap.set(item.label, item.value)
    })

    const merged = fullRange.map((item) => ({
      label: item.label,
      value: realDataMap.get(item.label) ?? 0,
    }))

    return merged.sort(
      (a, b) => new Date(a.label).getTime() - new Date(b.label).getTime()
    )
  }, [data, link, timeRange])

  return (
    <Card className="@container/card">
      <CardHeader>
        <CardTitle>Total Visitors</CardTitle>
        <CardDescription>
          <span className="hidden @[540px]/card:block">
            Total for the last 3 months
          </span>
          <span className="@[540px]/card:hidden">Last 3 months</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (!['Month', 'Week'].includes(value)) return
              setTimeRange(value as 'Month' | 'Week')
            }}
            variant="outline"
            className="hidden *:data-[slot=toggle-group-item]:!px-4 @[767px]/card:flex"
          >
            <ToggleGroupItem value="Month">Last 30 days</ToggleGroupItem>
            <ToggleGroupItem value="Week">Last 7 days</ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (!['Month', 'Week'].includes(value)) return
              setTimeRange(value as 'Month' | 'Week')
            }}
          >
            <SelectTrigger
              className="flex w-40 **:data-[slot=select-value]:block **:data-[slot=select-value]:truncate @[767px]/card:hidden"
              size="sm"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="Month" className="rounded-lg">
                Last 30 days
              </SelectItem>
              <SelectItem value="Week" className="rounded-lg">
                Last 7 days
              </SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                })
              }}
            />
            <ChartTooltip
              cursor={false}
              defaultIndex={isMobile ? -1 : 10}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="value"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
