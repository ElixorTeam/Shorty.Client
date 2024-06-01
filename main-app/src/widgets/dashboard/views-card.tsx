import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { type AnalyticsItem } from '@/entities/analytics'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'

export default function ViewsCard({ data }: { data: AnalyticsItem[] }) {
  return (
    <Card>
      <CardHeader className="gap-2">
        <CardTitle>Overview</CardTitle>
        <CardDescription>Views data for selected period</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {data.length ? (
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={data}>
              <XAxis
                dataKey="label"
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Line
                dataKey="value"
                type="monotone"
                className="[&_path]:stroke-primary"
              />
              <Tooltip />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-[350px] w-full flex-col items-center justify-center gap-3">
            <ExclamationTriangleIcon className="size-10 text-amber-500" />
            <span>No analytics found</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
