import { useEffect, useState } from 'react'
import { LinkRecordType } from '@/shared/LinkRecordType'
import LinkListItem from '@/components/LinksComponents/LinkListItem'
import LinkListHeader from '@/components/LinksComponents/LinkListHeader'
import { SortKeyEnum, SortOptionsType } from '@/shared/SortKeyEnum'
import { sortLinkData } from '@/utils/sortLinkData'
import { useGetLinksQuery } from '@/redux/linksFetch'

export default function LinkList({
  translate
}: {
  translate: { [_: string]: string }
}) {
  const { data, isLoading } = useGetLinksQuery()
  const [searchString, setSearchString] = useState('')
  const [sortedLinksData, setSortedLinksData] = useState<LinkRecordType[]>([])
  const sortOptions = [
    { id: 1, label: translate.sortKeyName, value: 'name' },
    { id: 2, label: translate.sortKeyDate, value: 'date' }
  ]
  const [selectedSort, setSelectedSort] = useState<SortOptionsType>(
    sortOptions[1]
  )
  useEffect(() => {
    if (data) {
      let linksList = [...data]
      if (searchString.length !== 0) {
        linksList = linksList.filter(link =>
          link.title.toLowerCase().includes(searchString.toLowerCase())
        )
      }
      setSortedLinksData(
        sortLinkData(linksList, selectedSort.value as SortKeyEnum)
      )
    }
  }, [data, selectedSort, searchString])

  return (
    <>
      <LinkListHeader
        sortOptions={sortOptions}
        placeholderText={translate.linkSearch}
        searchString={searchString}
        setSearchString={(state: string) => setSearchString(state)}
        selectedSort={selectedSort}
        setSelectedSort={(state: SortOptionsType) => setSelectedSort(state)}
      />
      <div className="overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 hover:overflow-y-auto dark:scrollbar-thumb-gray-500">
        {(data?.length === 0 || sortedLinksData.length === 0) && !isLoading ? (
          <div className="flex h-24 w-full items-center justify-center text-center">
            <p>No links found</p>
          </div>
        ) : null}
        {isLoading ? (
          <div className="h-24 w-full animate-pulse bg-slate-200 dark:bg-[#282834]" />
        ) : null}
        {sortedLinksData.map((linkItem: LinkRecordType) => (
          <LinkListItem key={linkItem.uid} linkData={linkItem} />
        ))}
      </div>
    </>
  )
}
