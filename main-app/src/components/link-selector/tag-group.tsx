'use client'

import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import TagGroupItem from '@/components/link-selector/tag-group-item'
import useFilteredLinks from '@/components/link-selector/use-filtered-list'
import { cn } from '@/lib/utils'
import { LinkRecordType } from '@/shared/link-record-type'

export default function SelectorTagGroup({
  tagTitle,
  links,
}: {
  tagTitle: string
  links: LinkRecordType[]
}) {
  const filteredLinks = useFilteredLinks(links)
  const [isOpen, setIsOpen] = useState(true)
  return (
    <div
      className={cn(
        filteredLinks.length === 0 ? 'hidden' : 'flex',
        'w-full flex-col overflow-hidden rounded-md border dark:border-zinc-800'
      )}
    >
      <div className="h-8 w-full">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={cn(
            isOpen ? 'border-b dark:border-b-zinc-800' : '',
            'flex h-full w-full shrink-0 items-center justify-between overflow-hidden px-4'
          )}
        >
          <span>{tagTitle}</span>
          {isOpen ? (
            <ChevronUpIcon className="size-4" />
          ) : (
            <ChevronDownIcon className="size-4" />
          )}
        </button>
      </div>
      <ul className={cn(isOpen ? 'flex' : 'hidden', 'w-full flex-col')}>
        {filteredLinks.map((item) => (
          <li key={item.uid}>
            <TagGroupItem link={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
