import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { computed, useSignal } from '@preact-signals/safe-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

import { DevicesData } from '@/entities/analytics'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from '@/shared/ui/select'

enum DeviceOptionEnum {
  OS = 'OS',
  Device = 'Device',
}

export default function DeviceCard({
  data,
}: {
  data: DevicesData | undefined
}) {
  const currentDeviceOption = useSignal<DeviceOptionEnum>(DeviceOptionEnum.OS)

  const analyticsData = computed(() => {
    if (currentDeviceOption.value == DeviceOptionEnum.OS) return data?.os ?? []
    return data?.device ?? []
  })
  return (
    <Card>
      <CardHeader className="pt-4">
        <CardTitle>
          <div className="flex items-center justify-between">
            <span className="truncate">Device information</span>
            <Select
              value={currentDeviceOption.value}
              onValueChange={(value) => {
                currentDeviceOption.value = value as DeviceOptionEnum
              }}
            >
              <SelectTrigger className="w-[180px]">
                {currentDeviceOption.value}
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
        {analyticsData.value.length > 0 ? (
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={analyticsData.value}>
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
            <ExclamationTriangleIcon className="size-10 text-amber-500" />
            <span>No analytics found</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
