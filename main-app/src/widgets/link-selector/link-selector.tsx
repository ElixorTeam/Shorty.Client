'use client'

import { ApiRecordType } from '@/shared/api/api-record-type'
import useGetRecords from '@/shared/api/use-get-posts'
import { LinkRecordType } from '@/shared/types/link-record-type'
import { ScrollArea } from '@/shared/ui/scroll-area'
import SelectorHeader from '@/widgets/link-selector/selector-header'
import SelectorTagGroup from '@/widgets/link-selector/tag-group'
import useGroupedLinks from '@/widgets/link-selector/use-grouped-links'

import { LinkSelectorContextProvider } from './selector-context'

export default function Selector() {
  const { data, isError, isFetching, isFetched } = useGetRecords()

  const convertToLinkRecord = (apiObject: ApiRecordType): LinkRecordType => ({
    uid: apiObject.id,
    title: apiObject.title,
    url: apiObject.shortSubDomain,
    createDate: new Date(apiObject.createDt),
    tag: apiObject.prefix,
    imageURL: '',
  })

  const groupedLinks = useGroupedLinks(data?.map(convertToLinkRecord) ?? [])
  return (
    <LinkSelectorContextProvider>
      <nav className="flex size-full flex-col overflow-hidden">
        <SelectorHeader />
        {isFetching && (
          <div className="flex size-full items-center justify-center">
            Loading...
          </div>
        )}
        {isError && (
          <div className="flex size-full items-center justify-center">
            Error while fetching data
          </div>
        )}
        {isFetched && !isError && (
          <ScrollArea className="size-full">
            <ul className="flex flex-col gap-2 px-3 pb-3">
              {Object.entries(groupedLinks).map(([tag, tagLinks]) => (
                <li key={tag}>
                  <SelectorTagGroup tagTitle={tag} links={tagLinks} />
                </li>
              ))}
            </ul>
          </ScrollArea>
        )}
      </nav>
    </LinkSelectorContextProvider>
  )
}
