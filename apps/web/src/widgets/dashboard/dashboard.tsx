'use client'

import {
  ArrowTrendingUpIcon,
  ClockIcon,
  EyeIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import { Button } from '@repo/ui/button'
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/tabs'
import { useToast } from '@repo/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

import {
  deleteLinkAnalytics,
  PeriodsEnum,
  useGetAnalyticsByLink,
} from '@/entities/analytics'
import { useGetCurrentRecord } from '@/entities/record'

import CsvGenerateForm from './csv-generate-form'
import DashboardCard from './dashboard-card'
import DeviceCard from './device-card'
import ViewsCard from './views-card'

export default function Dashboard() {
  const [period, setPeriod] = useState<PeriodsEnum>(PeriodsEnum.Week)
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const { data: record } = useGetCurrentRecord()
  const { data: analytics } = useGetAnalyticsByLink(period)

  const getUniqueRation = () => {
    if (!analytics || analytics.statistics.views == 0) return '100%'
    const stats = analytics.statistics
    return `${((stats.uniqueViews / stats.views) * 100).toFixed(0)}%`
  }

  const deleteAnalytics = async () => {
    const result = await deleteLinkAnalytics({
      linkUid: record?.uid ?? '',
    })

    if (!result?.data || 'failure' in result.data) {
      toast({
        title: 'Error while reseting',
        description: result?.data?.failure,
        variant: 'destructive',
      })
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['domains'] })
    toast({
      title: 'Successfully reseted',
    })
  }

  return (
    <div className="w-full space-y-4">
      <div className="flex flex-col justify-between space-y-2 pt-4 lg:flex-row lg:space-y-0">
        <div className="flex gap-4">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <Button onClick={deleteAnalytics} variant="outline">
            Reset
          </Button>
        </div>
        <CsvGenerateForm />
      </div>
      <Tabs
        value={period}
        onValueChange={(value) => {
          setPeriod(value as PeriodsEnum)
        }}
        className="w-72"
      >
        <TabsList className="grid w-full grid-cols-3">
          {(Object.keys(PeriodsEnum) as Array<keyof typeof PeriodsEnum>).map(
            (item) => (
              <TabsTrigger value={item} key={item}>
                {item}
              </TabsTrigger>
            )
          )}
        </TabsList>
      </Tabs>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total views"
          Icon={EyeIcon}
          value={analytics?.statistics.views.toString() ?? '0'}
          description=""
        />
        <DashboardCard
          title="Unique"
          Icon={UserIcon}
          value={analytics?.statistics.uniqueViews.toString() ?? '0'}
          description=""
        />
        <DashboardCard
          title="Ratio"
          Icon={ArrowTrendingUpIcon}
          value={getUniqueRation()}
          description=""
        />
        <DashboardCard
          title="Time left"
          Icon={ClockIcon}
          value="&#8734; days"
          description=""
        />
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <ViewsCard data={analytics?.viewsData ?? []} />
        <DeviceCard data={analytics?.devicesData} />
      </div>
    </div>
  )
}
