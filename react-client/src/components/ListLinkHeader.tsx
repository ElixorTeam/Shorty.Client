'use client'
import { ChangeEvent, useCallback, useState } from 'react'

const enum TableKeyEnum {
  Viewed = 'viewed',
  Last = 'last'
}

type SortOptionType = {
  title: string
  value: string
}

export default function ListLinkHeader({
  translate
}: {
  translate: { [key: string]: string }
}) {
  const [tableKey, setTableKey] = useState<TableKeyEnum>(TableKeyEnum.Viewed)
  const handleTableKey = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const sortKey = e.target.value as TableKeyEnum
    setTableKey(sortKey)
  }, [])
  const sortOptions: SortOptionType[] = [
    { title: translate['sortKeyViewed'], value: 'viewed' },
    { title: translate['sortKeyLast'], value: 'last' }
  ]
  return (
    <div className="sticky top-0 flex h-16 w-full items-center bg-white px-5 dark:bg-[#23212e] md:px-10">
      <div className="mr-2 flex flex-row items-center">
        <p className="mr-2 hidden text-gray-700 dark:text-gray-400 md:block">
          {translate['sortLabel']}
        </p>
        <select
          value={tableKey}
          onChange={handleTableKey}
          className="bg-white/[.0] text-black dark:text-white"
        >
          {sortOptions.map(item => (
            <option key={item.value} value={item.value}>
              {item.title}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
