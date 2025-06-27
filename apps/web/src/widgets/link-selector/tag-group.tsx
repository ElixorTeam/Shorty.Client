'use client'

import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { cn } from '@repo/ui/lib/utils'

import { RecordType } from '@/entities/record'

import TagGroupItem from './tag-group-item'
import useFilteredLinks from './use-filtered-list'
import { useState } from 'react'

export default function SelectorTagGroup({
  tagTitle,
  links,
}: {
  tagTitle: string
  links: RecordType[]
}) {
  const filteredLinks = useFilteredLinks(links)
  const [open, setOpen] = useState<boolean>(true)
  return (
    <div
      className={cn(
        filteredLinks.length > 0 ? 'flex' : 'hidden',
        'w-full flex-col overflow-hidden rounded-md border bg-background'
      )}
    >
      <div className="h-8 w-full">
        <button
          type="button"
          onClick={() => {
            setOpen(!open)
          }}
          className={cn(
            open ? 'border-b' : '',
            'flex size-full shrink-0 items-center justify-between overflow-hidden px-4'
          )}
        >
          <span>{tagTitle}</span>
          {open ? (
            <ChevronUpIcon className="size-4" />
          ) : (
            <ChevronDownIcon className="size-4" />
          )}
        </button>
      </div>
      <ul className={cn(open ? 'flex' : 'hidden', 'w-full flex-col')}>
        {filteredLinks.map((item) => (
          <li key={item.uid}>
            <TagGroupItem link={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
