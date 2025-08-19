'use client'

import { Card, CardContent, CardDescription, CardHeader } from '@repo/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@repo/ui/chart'
import { PieChartIcon } from 'lucide-react'
import { LabelList, RadialBar, RadialBarChart } from 'recharts'

import { rqClient } from '@/shared/api'

export const description = 'A radial chart with a label'

const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  desktop: {
    label: 'Desktop',
    color: 'var(--chart-1)',
  },
  mobile: {
    label: 'Mobile',
    color: 'var(--chart-2)',
  },
  others: {
    label: 'Others',
    color: 'var(--chart-3)',
  },
} satisfies ChartConfig

export function OsBarChart({ linkUid }: { linkUid: string }) {
  const { data } = rqClient.useQuery('get', '/user/links/{id}/analytics', {
    params: { path: { id: linkUid }, query: { period: 'Year' } },
  })

  const chartData =
    data?.data.devicesData.os.map((device, index) => ({
      browser: device.label,
      visitors: device.value,
      fill: `var(--chart-${index + 1})`,
    })) ?? []

  return (
    <Card className="gap-0 overflow-hidden pt-0 pb-3">
      <CardHeader className="dark:bg-secondary/50 mb-3 border-b px-4 pt-2 [.border-b]:pb-0.5">
        <CardDescription className="flex items-center gap-1.5">
          <PieChartIcon className="size-3.5" />
          <span>OS Data</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[200px]"
        >
          <RadialBarChart
            data={chartData}
            startAngle={-90}
            endAngle={380}
            innerRadius={30}
            outerRadius={110}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel nameKey="browser" />}
            />
            <RadialBar dataKey="visitors" background>
              <LabelList
                position="insideStart"
                dataKey="browser"
                className="fill-white capitalize mix-blend-luminosity"
                fontSize={11}
              />
            </RadialBar>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
