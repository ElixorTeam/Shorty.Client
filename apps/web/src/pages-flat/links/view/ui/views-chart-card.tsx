'use client'

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
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
import { ChartNoAxesCombinedIcon } from 'lucide-react'
import { useState } from 'react'
import { Area, AreaChart, CartesianGrid, XAxis } from 'recharts'

import { useGetLinkViews } from '@/entities/link'

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

export function ViewsChartCard({ linkUid }: { linkUid: string }) {
  const isMobile = useIsMobile()
  const [timeRange, setTimeRange] = useState<'Year' | 'Month'>('Year')
  const { data: views } = useGetLinkViews({
    linkUid: linkUid,
    timeRange: timeRange,
  })

  return (
    <Card className="@container/card gap-0 overflow-hidden pt-0 pb-4">
      <CardHeader className="dark:bg-secondary/50 flex items-center justify-between border-b px-4 pt-1.5 [.border-b]:pb-1.5">
        <CardDescription className="flex items-center gap-1.5">
          <ChartNoAxesCombinedIcon className="size-3.5" />
          <span>Views data</span>
        </CardDescription>
        <CardAction>
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={(value) => {
              if (!['Year', 'Month'].includes(value)) return
              setTimeRange(value as 'Year' | 'Month')
            }}
            variant="outline"
            className="bg-background/20 hidden *:data-[slot=toggle-group-item]:!px-2.5 @[767px]/card:flex"
          >
            <ToggleGroupItem value="Year" className="h-7 text-xs">
              Last 365 days
            </ToggleGroupItem>
            <ToggleGroupItem value="Month" className="h-7 text-xs">
              Last 30 days
            </ToggleGroupItem>
          </ToggleGroup>
          <Select
            value={timeRange}
            onValueChange={(value) => {
              if (!['Year', 'Month'].includes(value)) return
              setTimeRange(value as 'Year' | 'Month')
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
              <SelectItem value="Year" className="rounded-lg">
                Last 365 days
              </SelectItem>
              <SelectItem value="Month" className="rounded-lg">
                Last 30 days
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
          <AreaChart data={views}>
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
              tickFormatter={(value: string) => {
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
                  labelFormatter={(value: string) => {
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
