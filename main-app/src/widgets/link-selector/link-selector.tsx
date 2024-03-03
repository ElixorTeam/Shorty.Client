'use client'

import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'

import { useGetAllRecords, useGroupedRecords } from '@/entities/record'
import { ScrollArea } from '@/shared/ui/scroll-area'

import { LinkSelectorContextProvider } from './selector-context'
import SelectorHeader from './selector-header'
import SelectorTagGroup from './tag-group'

export default function Selector() {
  const { data, isPending } = useGetAllRecords()
  const groupedLinks = useGroupedRecords(data ?? [])
  return (
    <LinkSelectorContextProvider>
      <nav className="flex size-full flex-col overflow-hidden">
        <SelectorHeader />
        {data && data.length > 0 ? (
          <ScrollArea className="size-full overflow-hidden [&_div:first-child]:!block">
            <ul className="flex w-full flex-col gap-2 overflow-hidden px-3 pb-3">
              {Object.entries(groupedLinks).map(([tag, tagLinks]) => (
                <li key={tag}>
                  <SelectorTagGroup tagTitle={tag} links={tagLinks} />
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <div className="flex size-full items-center justify-center">
            {isPending ? (
              <span>Loading...</span>
            ) : (
              <>
                <ExclamationTriangleIcon className="size-16" />
                <span>No data found</span>
              </>
            )}
          </div>
        )}
      </nav>
    </LinkSelectorContextProvider>
  )
}
