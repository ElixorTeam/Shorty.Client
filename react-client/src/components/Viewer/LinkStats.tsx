'use client'

import { useAppSelector } from '@/redux/hooks'
import { useGetLinkAnalyticsQuery } from '@/redux/Api/analyzeApi'

function LinkStatItem({ label, newNumb }: { label: string; newNumb: number }) {
  return (
    <div className="w-full px-4">
      <p>{label}</p>
      <div className="flex w-full items-center justify-between">
        <div>
          <p className="inline text-xl font-semibold text-sky-400">
            {newNumb}{' '}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function LinkStats() {
  const selectedLink = useAppSelector(state => state.selectedLink.selected)
  const { data } = useGetLinkAnalyticsQuery(selectedLink.uid)
  return (
    <>
      <div className="flex h-1/3 w-full items-center border-b dark:border-b-neutral-600">
        <LinkStatItem
          label="Total views"
          newNumb={data ? data.views.total : 0}
        />
      </div>
      <div className="flex h-1/3 items-center border-b dark:border-b-neutral-600">
        <LinkStatItem
          label="Unique views"
          newNumb={data ? data.views.unique : 0}
        />
      </div>
      <div className="flex h-1/3 items-center">
        <LinkStatItem
          label="Avg views per day"
          newNumb={data ? data.views.avg_day : 0}
        />
      </div>
    </>
  )
}
