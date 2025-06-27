import { TriangleAlertIcon } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@repo/ui/select'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { DevicesData } from '@/entities/analytics'
import { useMemo, useState } from 'react'

enum DeviceOptionEnum {
  OS = 'OS',
  Device = 'Device',
}

export default function DeviceCard({
  data,
}: {
  data: DevicesData | undefined
}) {
  const [currentDeviceOption, setCurrentDeviceOption] =
    useState<DeviceOptionEnum>(DeviceOptionEnum.OS)

  const analyticsData = useMemo(() => {
    return currentDeviceOption === DeviceOptionEnum.OS
      ? (data?.os ?? [])
      : (data?.device ?? [])
  }, [currentDeviceOption, data])
  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="pt-4">
        <CardTitle>
          <div className="flex items-center justify-between">
            <span className="truncate">Device information</span>
            <Select
              value={currentDeviceOption}
              onValueChange={(value) => {
                setCurrentDeviceOption(value as DeviceOptionEnum)
              }}
            >
              <SelectTrigger className="w-28 sm:w-52">
                {currentDeviceOption}
              </SelectTrigger>
              <SelectContent>
                {(
                  Object.keys(DeviceOptionEnum) as Array<
                    keyof typeof DeviceOptionEnum
                  >
                ).map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardTitle>
        <CardDescription>
          You can view information about the user agent, os, browser
        </CardDescription>
      </CardHeader>
      <CardContent>
        {analyticsData.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={analyticsData}>
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
              <Bar
                dataKey="value"
                fill="currentColor"
                radius={[4, 4, 0, 0]}
                className="fill-primary"
              />
            </BarChart>
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
