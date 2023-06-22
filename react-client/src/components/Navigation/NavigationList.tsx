'use client'

import { useEffect, useState } from 'react'
import { LinkRecordType } from '@/shared/LinkRecordType'
import NavigationListItem from '@/components/Navigation/NavigationListItem'
import { SortKeyEnum } from '@/shared/SortKeyEnum'
import { sortLinkData } from '@/utils/sortLinkData'
import { useGetLinksQuery } from '@/redux/linksApi'
import { useAppSelector } from '@/redux/hooks'
import { FolderIcon } from '@heroicons/react/24/outline'
import './NavigationList.css'

export default function NavigationList() {
  const selectedSort = useAppSelector(state => state.linksSort.selectedSort)
  const searchString = useAppSelector(state => state.searchText.text)
  const { data, isLoading } = useGetLinksQuery()
  const [sortedLinksData, setSortedLinksData] = useState<LinkRecordType[]>([])
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
    <ul className="overflow-y-hidden scrollbar-thin scrollbar-thumb-gray-300 hover:overflow-y-auto dark:scrollbar-thumb-gray-500">
      {(data?.length === 0 || sortedLinksData.length === 0) && !isLoading && (
        <li className="flex h-24 w-full flex-col items-center justify-center text-center text-gray-400 dark:text-gray-600">
          <FolderIcon className="h-8 w-8 stroke-1" />
          <p>No links found</p>
        </li>
      )}
      {isLoading && (
        <li className="h-24 w-full animate-pulse bg-slate-200 dark:bg-[#282834]" />
      )}
      {sortedLinksData.map((item: LinkRecordType) => (
        <li key={item.uid}>
          <NavigationListItem linkData={item} />
        </li>
      ))}
    </ul>
  )
}
