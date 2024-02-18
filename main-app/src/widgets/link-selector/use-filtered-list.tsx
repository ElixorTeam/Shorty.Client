import { useMemo } from 'react'

import { LinkRecordType } from '@/shared/types/link-record-type'
import { SortKey } from '@/widgets/link-selector/sort-key-enum'

import { useSearchingString, useSortKey } from './selector-context'

export default function useFilteredLinks(links: LinkRecordType[]) {
  const { searchingString } = useSearchingString()
  const { sortKey } = useSortKey()

  return useMemo<LinkRecordType[]>(
    () =>
      links
        .filter((item) => item.title.includes(searchingString))
        .sort((a, b) => {
          switch (sortKey) {
            case SortKey.NAME:
              return a.title.localeCompare(b.title)
            case SortKey.DATE:
              return b.createDate.getTime() - a.createDate.getTime()
            default:
              return 0
          }
        }),
    [links, searchingString, sortKey]
  )
}
