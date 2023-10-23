import { LinkRecordType } from '@/shared/LinkRecordType'
import { SortKeyEnum } from '@/shared/SortKeyEnum'
import useSearchStore from '@/stores/searchStore'
import useSortStore from '@/stores/sortStore'

export default function useFilteredLinks(links: LinkRecordType[]) {
  const searchString = useSearchStore((state) => state.searchString)
  const sortKey = useSortStore((state) => state.sortKey)

  return links
    .filter((item) => item.title.includes(searchString))
    .sort((a, b) => {
      switch (sortKey) {
        case SortKeyEnum.Name:
          return a.title.localeCompare(b.title)
        case SortKeyEnum.Date:
          return b.createDate.getTime() - a.createDate.getTime()
        default:
          return 0
      }
    })
}
