import { ChevronDownIcon } from '@heroicons/react/24/solid'

import DevicesChart from '@/components/Charts/DevicesChart'

export default function DevicesChartWrapper() {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden px-6 py-4">
      <div className="mb-2 flex w-full justify-between">
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
  )
}
