'use client'

import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'

import TagGroupItem from '@/components/Selector/TagGroupItem'
import { LinkRecordType } from '@/shared/LinkRecordType'
import { SortKeyEnum } from '@/shared/SortKeyEnum'
import useSearchStore from '@/stores/searchStore'
import useSortStore from '@/stores/sortStore'

export default function SelectorTagGroup({
  tagTitle,
  links,
}: {
  tagTitle: string
  links: LinkRecordType[]
}) {
  const [isOpen, setIsOpen] = useState(true)

  const searchString = useSearchStore((state) => state.searchString)
  const sortKey = useSortStore((state) => state.sortKey)

  const filteredAndSortedLinks = links
    .filter((item) => item.title.includes(searchString))
    .sort((a, b) => {
      switch (sortKey) {
        case SortKeyEnum.Name:
          return a.title.localeCompare(b.title)
        case SortKeyEnum.Date:
          return b.createDate.getTime() - a.createDate.getTime()
        // case SortKeyEnum.View:
        //   return b.views - a.views;
        default:
          return 0
      }
    })

  return (
    <div
      className={clsx(
        filteredAndSortedLinks.length === 0 ? 'hidden' : 'flex',
        'w-full flex-col'
      )}
    >
      <div className="h-8 w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex h-full w-full items-center justify-between overflow-hidden border-b bg-white px-4 dark:border-b-white/[.1] dark:bg-neutral-900/[.6]"
        >
          <p className="">{tagTitle}</p>
          {isOpen ? (
            <ChevronUpIcon className="h-4 w-4" />
          ) : (
            <ChevronDownIcon className="h-4 w-4" />
          )}
        </button>
      </div>
      <ul
        className={clsx(
          isOpen ? 'flex' : 'hidden',
          'w-full flex-col gap-1 border-b dark:border-b-white/[.15]'
        )}
      >
        {filteredAndSortedLinks.map((item) => (
          <li key={item.uid}>
            <TagGroupItem link={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
