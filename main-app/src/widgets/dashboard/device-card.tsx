import { useSignal } from '@preact-signals/safe-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts'

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

type DeviceDataType = {
  value: string
  name: string
}

const deviceTypes: DeviceDataType[] = [
  { value: 'ua', name: 'User agent' },
  { value: 'os', name: 'OS' },
  { value: 'browser', name: 'Browser' },
]

const testData = [
  { name: 'Group A', value: Math.floor(Math.random() * 50) + 100 },
  { name: 'Group B', value: Math.floor(Math.random() * 50) + 100 },
  { name: 'Group C', value: Math.floor(Math.random() * 50) + 100 },
  { name: 'Group D', value: Math.floor(Math.random() * 50) + 100 },
  { name: 'Group E', value: Math.floor(Math.random() * 50) + 100 },
  { name: 'Group F', value: Math.floor(Math.random() * 50) + 100 },
]

export default function DeviceCard() {
  const currentDeviceType = useSignal<DeviceDataType>(deviceTypes[0])

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <span className="truncate">Device information</span>
            <Select
              value={currentDeviceType.value.value}
              onValueChange={(value) => {
                const deviceType = deviceTypes.find(
                  (itemToFind) => itemToFind.value === value
                )
                if (deviceType) currentDeviceType.value = deviceType
              }}
            >
              <SelectTrigger className="w-[180px]">
                {currentDeviceType.value.name}
              </SelectTrigger>
              <SelectContent>
                {deviceTypes.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.name}
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
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={testData}>
            <XAxis
              dataKey="name"
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
      </CardContent>
    </Card>
  )
}
