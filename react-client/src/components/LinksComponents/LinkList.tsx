import { useEffect, useState } from 'react'
import { LinkRecordType } from '@/shared/LinkRecordType'
import LinkListItem from '@/components/LinksComponents/LinkListItem'
import LinkListHeader from '@/components/LinksComponents/LinkListHeader'
import { SortKeyEnum, SortOptionsType } from '@/shared/SortKeyEnum'
import { sortLinkData } from '@/utils/sortLinkData'

export default function ListLink({
  translate,
  linksData,
  isLoading,
  selectedLink,
  setSelectedLink
}: {
  translate: { [_: string]: string }
  linksData: LinkRecordType[] | undefined
  isLoading: boolean
  selectedLink: LinkRecordType | null
  setSelectedLink: (link: LinkRecordType) => void
}) {
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
    if (linksData) {
      let linksList = [...linksData]
      if (searchString.length !== 0) {
        linksList = linksList.filter(link =>
          link.title.toLowerCase().includes(searchString.toLowerCase())
        )
      }
      setSortedLinksData(
        sortLinkData(linksList, selectedSort.value as SortKeyEnum)
      )
    }
  }, [linksData, selectedSort, searchString])

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
      <div>
        {linksData?.length === 0 && !isLoading ? (
          <div className="flex h-24 w-full items-center justify-center text-center">
            <p>You have not add any links</p>
          </div>
        ) : null}
        {isLoading ? (
          <div className="h-24 w-full animate-pulse bg-gray-200 dark:bg-[#282834]" />
        ) : null}
        {sortedLinksData.map((item: LinkRecordType) => (
          <LinkListItem
            key={item.uid}
            onClick={() => setSelectedLink(item)}
            linkData={item}
            selectedUID={selectedLink?.uid}
          />
        ))}
      </div>
    </>
  )
}
