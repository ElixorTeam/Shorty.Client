import { ChevronDownIcon } from '@heroicons/react/24/solid'

import DevicesChart from '@/components/Charts/DevicesChart'
import WeekLineChart from '@/components/Charts/WeekLineChart'

export default function Dashboard() {
  return (
    <div className="mx-auto flex h-full w-full max-w-screen-xl flex-wrap content-start items-stretch justify-center gap-x-5 gap-y-10 overflow-x-hidden px-4 pb-10 pt-6 md:px-10 2xl:justify-between">
      <div className="h-72 w-full min-w-[18rem] max-w-full shrink grow basis-[18rem] overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-white/[.2] dark:bg-gradient-to-br dark:from-black dark:to-neutral-900 xl:max-w-lg">
        <div className="grid h-full w-full grid-cols-[1fr,12rem] grid-rows-3 flex-wrap divide-x dark:divide-white/[.2]">
          <div className="relative row-span-3 h-full w-full">
            <div className="absolute left-0 top-0 ml-4 mt-2">
              <p className="text-xl">Total views</p>
            </div>
            <div className="flex h-full w-full items-center justify-center">
              <div className="relative px-8">
                <p className="text-6xl font-semibold text-sky-500">14.5k</p>
                <div className="absolute -top-4 right-4">
                  <p className="text-lg text-gray-500 dark:text-neutral-700">
                    + 140
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-full w-full flex-col justify-center border-b px-4">
            <p>Unique</p>
            <p className="text-3xl font-semibold text-gray-700 dark:text-neutral-400">
              1.45k
            </p>
          </div>
          <div className="col-start-2 row-start-2 flex h-full w-full flex-col justify-center border-b px-4">
            <p>Trend</p>
            <p className="text-3xl font-semibold text-green-500">40%</p>
          </div>
          <div className="col-start-2 row-start-3 flex h-full w-full flex-col justify-center px-4">
            <p>Time left</p>
            <p className="text-3xl font-semibold text-red-500">2 weeks</p>
          </div>
        </div>
      </div>
      <div className="flex h-72 w-full min-w-[18rem] max-w-full shrink grow basis-[18rem] flex-col justify-center gap-4 overflow-hidden rounded-2xl border bg-white px-4 pt-3 shadow-sm dark:border-white/[.2] dark:bg-gradient-to-br dark:from-black dark:to-neutral-900 xl:max-w-2xl">
        <div className="flex w-full justify-between">
          <p className="text-2xl font-semibold text-stone-800 dark:text-neutral-300">
            Views statistics
          </p>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-black/[.1] bg-sky-400 px-3 py-1 shadow"
          >
            <p className="text-white">Device</p>
            <ChevronDownIcon className="mt-1 h-4 w-4 text-white" />
          </button>
        </div>
        <div className="h-full w-full overflow-hidden">
          <DevicesChart />
        </div>
      </div>
      <div className="flex h-[24rem] w-full max-w-full flex-col gap-4 overflow-hidden rounded-2xl border bg-white px-8 py-4 shadow-sm dark:border-white/[.2] dark:bg-gradient-to-br dark:from-black dark:to-neutral-900">
        <div className="mb-4 flex w-full justify-between">
          <p className="text-2xl font-semibold text-stone-800 dark:text-neutral-300">
            Views statistics
          </p>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-black/[.1] bg-sky-400 px-3 py-1 shadow"
          >
            <p className="text-white">Week</p>
            <ChevronDownIcon className="mt-1 h-4 w-4 text-white" />
          </button>
        </div>
        <div className="h-full w-full">
          <WeekLineChart />
        </div>
      </div>
    </div>
  )
}
