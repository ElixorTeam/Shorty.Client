import { DashboardItem } from '@/components/Dashboard/DashboardItem'
import DevicesChartWrapper from '@/components/Dashboard/DevicesChartWrapper'
import StatisticsChart from '@/components/Dashboard/StatisticsChart'
import WeekLineChartWrapper from '@/components/Dashboard/WeekLineChartWrapper'

export default function Dashboard() {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-xl flex-wrap content-start items-stretch justify-center gap-x-6 gap-y-8 overflow-x-hidden px-4 pb-10 pt-6 md:px-10 2xl:justify-between">
      <DashboardItem>
        <StatisticsChart
          totalViews={140}
          uniqueViews={40}
          todayViews={2}
          trend={30}
          dayLeft={2}
        />
      </DashboardItem>
      <DashboardItem>
        <DevicesChartWrapper />
      </DashboardItem>
      <DashboardItem size="lg">
        <WeekLineChartWrapper />
      </DashboardItem>
    </div>
  )
}
