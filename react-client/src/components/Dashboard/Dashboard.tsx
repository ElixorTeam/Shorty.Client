import { DashboardPanel } from '@/components/Dashboard/DashboardPanel'
import DeviceOsBrowserChartWrapper from '@/components/Dashboard/DeviceOsBrowserChartWrapper'
import StatisticsOverview from '@/components/Dashboard/StatisticsOverview'
import ViewsLineChartWrapper from '@/components/Dashboard/ViewsLineChartWrapper'

export default function Dashboard() {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-xl flex-wrap content-start items-stretch justify-center gap-x-6 gap-y-8 overflow-x-hidden px-4 pb-10 pt-6 md:px-10 2xl:justify-between">
      <DashboardPanel>
        <StatisticsOverview
          totalViews={140}
          uniqueViews={40}
          todayViews={2}
          trend={30}
          dayLeft={2}
        />
      </DashboardPanel>
      <DashboardPanel>
        <DeviceOsBrowserChartWrapper />
      </DashboardPanel>
      <DashboardPanel size="lg">
        <ViewsLineChartWrapper />
      </DashboardPanel>
    </div>
  )
}
