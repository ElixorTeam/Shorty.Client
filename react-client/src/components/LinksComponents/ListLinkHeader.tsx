'use client'

import { ChangeEvent, useCallback, useState } from 'react'

export const enum TableKeyEnum {
  Alphabet = 'alphabet',
  Last = 'last'
}

type SortOptionType = {
  title: string
  value: string
}

export default function ListLinkHeader({
  translate,
  selectedSort,
  setSelectedSort
}: {
  translate: { [_: string]: string }
  selectedSort: TableKeyEnum
  setSelectedSort: (key: TableKeyEnum) => void
}) {
  const [tableKey, setTableKey] = useState<TableKeyEnum>(selectedSort)
  const handleTableKey = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      const sortKey = e.target.value as TableKeyEnum
      setTableKey(sortKey)
      setSelectedSort(sortKey)
    },
    [setSelectedSort]
  )
  const sortOptions: SortOptionType[] = [
    { title: translate.sortKeyAlphabet, value: 'alphabet' },
    { title: translate.sortKeyLast, value: 'last' }
  ]
  return (
    <div className="sticky top-0 flex h-16 w-full items-center bg-white px-5 shadow-inner dark:bg-[#23212e] md:px-10">
      <div className="mr-2 flex flex-row items-center">
        <p className="mr-2 hidden text-gray-700 dark:text-gray-400 md:block">
          {translate.sortLabel}
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
