import { ArrowLongUpIcon } from '@heroicons/react/24/solid'
import { ArrowLongDownIcon } from '@heroicons/react/24/outline'

function LinkStatItem({
  label,
  oldNumb,
  newNumb
}: {
  label: string
  oldNumb: number
  newNumb: number
}) {
  const percInc = ((newNumb - oldNumb) / oldNumb) * 100
  return (
    <div className="w-full px-4">
      <p>{label}</p>
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="inline text-xl font-semibold text-sky-400">
            {newNumb}{' '}
          </p>
          <p className="inline text-sm text-gray-500">from {oldNumb}</p>
        </div>
        {percInc <= 0 ? (
          <div className="mt-1 flex items-center rounded-xl bg-red-200 pl-1 pr-2">
            <ArrowLongDownIcon className="h-3 w-3 pt-[2px] text-red-500" />
            <p className="text-xs text-red-700">
              {Math.abs(percInc).toFixed(1)}%
            </p>
          </div>
        ) : (
          <div className="mt-1 flex items-center rounded-xl bg-green-200 pl-1 pr-2">
            <ArrowLongUpIcon className="h-3 w-3 pt-[1px] text-green-500" />
            <p className="text-xs text-green-700">{percInc.toFixed(1)}%</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LinkStats() {
  const totalNew = 4312
  const totalOld = 3728
  const uniqNew = 41
  const uniqOld = 32
  const avgNew = 20.02
  const avgOld = 30.97
  return (
    <>
      <div className="flex h-1/3 w-full items-center border-b dark:border-b-neutral-600">
        <LinkStatItem
          label="Total views"
          oldNumb={totalOld}
          newNumb={totalNew}
        />
      </div>
      <div className="flex h-1/3 items-center border-b dark:border-b-neutral-600">
        <LinkStatItem
          label="Unique views"
          oldNumb={uniqOld}
          newNumb={uniqNew}
        />
      </div>
      <div className="flex h-1/3 items-center">
        <LinkStatItem
          label="Avg views per day"
          oldNumb={avgOld}
          newNumb={avgNew}
        />
      </div>
    </>
  )
}
