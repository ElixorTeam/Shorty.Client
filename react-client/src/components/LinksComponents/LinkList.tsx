import { useEffect, useState } from 'react'
import { LinkRecordType } from '@/shared/LinkRecordType'
import LinkListItem from '@/components/LinksComponents/LinkListItem'
import LinkListHeader from '@/components/LinksComponents/LinkListHeader'
import { TableKeyEnum } from '@/shared/TableKeyEnum'
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
  const [sortedLinksData, setSortedLinksData] = useState<LinkRecordType[]>([])
  const [selectedSort, setSelectedSort] = useState<TableKeyEnum>(
    TableKeyEnum.Last
  )
  useEffect(() => {
    if (linksData)
      setSortedLinksData(sortLinkData([...linksData], selectedSort))
  }, [linksData, selectedSort])
  return (
    <>
      <LinkListHeader
        translate={translate}
        selectedSort={selectedSort}
        setSelectedSort={key => setSelectedSort(key)}
      />
      <div>
        {isLoading ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
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
