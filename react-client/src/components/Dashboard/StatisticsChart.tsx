export default function StatisticsChart({
  totalViews,
  uniqueViews,
  todayViews,
  trend,
  dayLeft,
}: {
  totalViews: number
  uniqueViews: number
  todayViews: number
  trend: number
  dayLeft: number
}) {
  return (
    <div className="grid h-full w-full grow grid-cols-[1.5fr,1fr] grid-rows-3 flex-wrap divide-x dark:divide-white/[.15]">
      <div className="relative row-span-3 h-full w-full">
        <div className="absolute left-0 top-0 ml-4 mt-2">
          <p className="text-xl">Total views</p>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative px-8">
            <p className="text-6xl font-semibold text-sky-500">{totalViews}</p>
            <div className="absolute -top-4 right-4">
              <p className="text-lg text-gray-500 dark:text-neutral-700">
                + {todayViews}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-full w-full flex-col justify-center border-b px-4">
        <p>Unique</p>
        <p className="text-3xl font-semibold text-gray-700 dark:text-neutral-400">
          {uniqueViews}
        </p>
      </div>
      <div className="col-start-2 row-start-2 flex h-full w-full flex-col justify-center border-b px-4">
        <p>Trend</p>
        <p className="text-3xl font-semibold text-green-500">{trend}%</p>
      </div>
      <div className="col-start-2 row-start-3 flex h-full w-full flex-col justify-center px-4">
        <p>Time left</p>
        <p className="text-3xl font-semibold text-red-500">{dayLeft}</p>
      </div>
    </div>
  )
}
