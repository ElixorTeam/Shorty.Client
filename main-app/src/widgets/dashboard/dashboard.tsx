'use client'

import {
  ArrowTrendingUpIcon,
  ClockIcon,
  EyeIcon,
  UserIcon,
} from '@heroicons/react/24/outline'

import DatePickerWithRange from '@/features/date-picker-with-range'
import { Button } from '@/shared/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'

import DashboardCard from './dashboard-card'
import {
  currentTimePeriod,
  TimePeriodsEnum,
  timePeriodsList,
} from './dashboard-context'
import DeviceCard from './device-card'
import ViewsCard from './views-card'

export default function Dashboard() {
  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col justify-between space-y-2 pt-4 lg:flex-row lg:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex gap-3">
          <DatePickerWithRange />
          <Button>Download</Button>
        </div>
      </div>
      <Tabs
        value={currentTimePeriod.value.toString()}
        onValueChange={(value) => {
          currentTimePeriod.value = value as unknown as TimePeriodsEnum
        }}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-4">
          {timePeriodsList.map((item) => (
            <TabsTrigger value={item.id.toString()} key={item.id}>
              {item.name}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total views"
          Icon={EyeIcon}
          value="1400"
          description="+20.1% from last day"
        />
        <DashboardCard
          title="Unique"
          Icon={UserIcon}
          value="140"
          description="+20.1% from last day"
        />
        <DashboardCard
          title="Trend"
          Icon={ArrowTrendingUpIcon}
          value="30%"
          description="+4.1% from last day"
        />
        <DashboardCard
          title="Time left"
          Icon={ClockIcon}
          value="43 days"
          description=""
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ViewsCard />
        <DeviceCard />
      </div>
    </div>
  )
}
