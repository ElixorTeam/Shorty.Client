import StatisticsChart from '@/components/Charts/StatisticsChart'
import DevicesChartWrapper from '@/components/Dashboard/DevicesChartWrapper'
import WeekLineChartWrapper from '@/components/Dashboard/WeekLineChartWrapper'

export default function Dashboard() {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-xl flex-wrap content-start items-stretch justify-center gap-x-5 gap-y-10 overflow-x-hidden px-4 pb-10 pt-6 md:px-10 2xl:justify-between">
      <div className="h-72 w-full min-w-[18rem] max-w-full shrink grow basis-[18rem] overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-white/[.15] dark:bg-gradient-to-br dark:from-neutral-900 dark:to-black xl:max-w-lg">
        <StatisticsChart
          totalViews={140}
          uniqueViews={40}
          todayViews={2}
          trend={30}
          dayLeft={2}
        />
      </div>
      <div className="flex h-72 w-full min-w-[18rem] max-w-full shrink grow basis-[18rem] flex-col justify-center gap-4 overflow-hidden rounded-2xl border bg-white px-4 pt-3 shadow-sm dark:border-white/[.15] dark:bg-gradient-to-br dark:from-neutral-900 dark:to-black xl:max-w-2xl">
        <DevicesChartWrapper />
      </div>
      <div className="flex h-[24rem] w-full max-w-full flex-col gap-4 overflow-hidden rounded-2xl border bg-white px-8 py-4 shadow-sm dark:border-white/[.15] dark:bg-gradient-to-br dark:from-neutral-900 dark:to-black">
        <WeekLineChartWrapper />
      </div>
    </div>
  )
}
