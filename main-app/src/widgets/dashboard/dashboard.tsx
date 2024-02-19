'use client'

import {
  ArrowTrendingUpIcon,
  ClockIcon,
  EyeIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

import DatePickerWithRange from '@/features/date-picker-with-range/date-picker-with-range'
import { Button } from '@/shared/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/shared/ui/tabs'
import DashboardCard from '@/widgets/dashboard/dashboard-card'
import RecentViews from '@/widgets/dashboard/recent-views'
import ViewsDiagram from '@/widgets/dashboard/views-diagram'

export default function Dashboard() {
  const [currentTab, setCurrentTab] = useState<string>('all-time')
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
        value={currentTab}
        onValueChange={setCurrentTab}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-time">All time</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total views"
          Icon={EyeIcon}
          value="1400"
          subvalue="+20.1% from last day"
        />
        <DashboardCard
          title="Unique"
          Icon={UserIcon}
          value="140"
          subvalue="+20.1% from last day"
        />
        <DashboardCard
          title="Trend"
          Icon={ArrowTrendingUpIcon}
          value="30%"
          subvalue="+4.1% from last day"
        />
        <DashboardCard
          title="Time left"
          Icon={ClockIcon}
          value="43 days"
          subvalue=""
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ViewsDiagram />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentViews />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
