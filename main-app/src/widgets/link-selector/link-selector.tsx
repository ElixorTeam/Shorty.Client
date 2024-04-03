'use client'

import {
  ArchiveBoxXMarkIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

import { useGetAllRecords, useGroupedRecords } from '@/entities/record'
import { ScrollArea } from '@/shared/ui/scroll-area'
import Skeleton from '@/shared/ui/skeleton'

import { LinkSelectorContextProvider } from './selector-context'
import SelectorHeader from './selector-header'
import SelectorTagGroup from './tag-group'

export default function Selector() {
  const { data, isPending, isError } = useGetAllRecords()
  const groupedLinks = useGroupedRecords(data ?? [])
  return (
    <LinkSelectorContextProvider>
      <nav className="flex size-full flex-col overflow-hidden">
        <SelectorHeader />
        {data && data.length > 0 ? (
          <ScrollArea className="size-full overflow-hidden [&>div>div]:!block">
            <ul className="flex w-full flex-col gap-2 overflow-hidden px-3 pb-3">
              {Object.entries(groupedLinks).map(([tag, tagLinks]) => (
                <li key={tag}>
                  <SelectorTagGroup tagTitle={tag} links={tagLinks} />
                </li>
              ))}
            </ul>
          </ScrollArea>
        ) : (
          <div className="flex size-full">
            {isPending ? (
              <div className="w-full space-y-3 px-3">
                <Skeleton className="h-24 w-full overflow-hidden rounded-md" />
                <Skeleton className="h-24 w-full overflow-hidden rounded-md" />
              </div>
            ) : isError ? (
              <div className="m-auto flex flex-col items-center gap-y-2 text-destructive">
                <ExclamationTriangleIcon className="size-10 stroke-[0.8]" />
                <span>Error while fetching data</span>
              </div>
            ) : (
              <div className="m-auto flex flex-col items-center gap-y-2">
                <ArchiveBoxXMarkIcon className="size-10 stroke-[0.8]" />
                <span>No data found</span>
              </div>
            )}
          </div>
        )}
      </nav>
    </LinkSelectorContextProvider>
  )
}
