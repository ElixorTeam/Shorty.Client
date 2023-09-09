'use client'

import { useGetLinkAnalyticsQuery } from '@/redux/Api/analyzeApi'
import { useAppSelector } from '@/redux/hooks'

function LinkStatItem({ label, value }: { label: string; value: number }) {
  return (
    <li className="flex h-1/3 w-full flex-col px-4 py-2">
      <p className="line-clamp-1 text-gray-400 dark:text-gray-600">{label}</p>
      <p className="text-2xl font-semibold text-sky-400">{value}</p>
    </li>
  )
}

export default function LinkStats({
  translate,
}: {
  translate: { [_: string]: string }
}) {
  const selectedLink = useAppSelector((state) => state.selectedLink.selected)
  const { data } = useGetLinkAnalyticsQuery(selectedLink.uid)
  return (
    <ul className="h-full w-full divide-y dark:divide-white/[.05]">
      <LinkStatItem
        label={translate.statTotal}
        value={data ? data.views.total : 0}
      />
      <LinkStatItem
        label={translate.statUnique}
        value={data ? data.views.unique : 0}
      />
      <LinkStatItem
        label={translate.statAverage}
        value={data ? data.views.avg_day : 0}
      />
    </ul>
  )
}
