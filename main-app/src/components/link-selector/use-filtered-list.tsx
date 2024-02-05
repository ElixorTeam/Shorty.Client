import { LinkRecordType } from '@/shared/link-record-type'
import { useSearchingString, useSortKey } from './selector-context'
import { SortKey } from '@/components/link-selector/sort-key-enum'
import { useMemo } from 'react'

export default function useFilteredLinks(links: LinkRecordType[]) {
  const { searchingString } = useSearchingString()
  const { sortKey } = useSortKey()

  return useMemo<LinkRecordType[]>(() => {
    return links
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
      })
  }, [links, searchingString, sortKey])
}
