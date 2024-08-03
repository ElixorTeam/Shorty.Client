import { useMemo } from 'react'

import { type RecordType } from '@/entities/record'

import { useSearchingString, useSortKey } from './selector-context'
import { SortKey } from './sort-key-enum'

export default function useFilteredLinks(links: RecordType[]) {
  const { searchingString } = useSearchingString()
  const { sortKey } = useSortKey()

  return useMemo<RecordType[]>(
    () =>
      links
        .filter((item) =>
          item.title.toLowerCase().includes(searchingString.toLowerCase())
        )
        .sort((a, b) => {
          switch (sortKey) {
            case SortKey.NAME:
              return a.title.localeCompare(b.title)
            case SortKey.DATE:
              return (
                new Date(b.createDt).getTime() - new Date(a.createDt).getTime()
              )
            default:
              return 0
          }
        }),
    [links, searchingString, sortKey]
  )
}
