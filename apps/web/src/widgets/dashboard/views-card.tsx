import { TriangleAlertIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card'
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { type AnalyticsItem } from '@/entities/analytics'

export default function ViewsCard({ data }: { data: AnalyticsItem[] }) {
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="gap-2">
        <CardTitle>Overview</CardTitle>
        <CardDescription>Views data for selected period</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        {data.length > 0 ? (
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
            <TriangleAlertIcon className="size-10 text-amber-500" />
            <span>No analytics found</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
