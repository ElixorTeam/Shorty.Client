'use client'

import { Card, CardContent, CardDescription, CardHeader } from '@repo/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@repo/ui/chart'
import { SquareChartGanttIcon } from 'lucide-react'
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts'

import { rqClient } from '@/shared/api'

export const description = 'A radial chart with stacked sections'

const chartConfig = {
  unique: {
    label: 'Unique',
    color: 'var(--chart-1)',
  },
  nonunique: {
    label: 'Non-Unique',
    color: 'var(--chart-2)',
  },
} satisfies ChartConfig

export function UniqueRadialChart({ linkUid }: { linkUid: string }) {
  const { data } = rqClient.useQuery('get', '/user/links/{id}/analytics', {
    params: { path: { id: linkUid }, query: { period: 'Year' } },
  })

  const totalVisitors = data?.data.statistics.views ?? 0

  const chartData = [
    {
      month: '',
      unique: data?.data.statistics.uniqueViews ?? 0,
      nonunique:
        (data?.data.statistics.views ?? 0) -
        (data?.data.statistics.uniqueViews ?? 0),
    },
  ]

  return (
    <Card className="gap-0 overflow-hidden pt-0 pb-3">
      <CardHeader className="dark:bg-secondary/50 mb-3 border-b px-4 pt-2 [.border-b]:pb-0.5">
        <CardDescription className="flex items-center gap-1.5">
          <SquareChartGanttIcon className="size-3.5" />
          <span>Total / Unique Visitors</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px] w-full max-w-[200px] pt-0"
        >
          <RadialBarChart
            data={chartData}
            endAngle={360}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) - 6}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 18}
                          className="fill-muted-foreground"
                        >
                          Total Visitors
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="unique"
              stackId="a"
              fill="var(--color-unique)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="nonunique"
              fill="var(--color-nonunique)"
              stackId="a"
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
