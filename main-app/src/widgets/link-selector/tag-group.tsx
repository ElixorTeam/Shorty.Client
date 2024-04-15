'use client'

import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useSignal } from '@preact-signals/safe-react'

import { RecordType } from '@/entities/record'
import cn from '@/shared/lib/tailwind-merge'

import TagGroupItem from './tag-group-item'
import useFilteredLinks from './use-filtered-list'

export default function SelectorTagGroup({
  tagTitle,
  links,
}: {
  tagTitle: string
  links: RecordType[]
}) {
  const filteredLinks = useFilteredLinks(links)
  const open = useSignal<boolean>(true)
  return (
    <div
      className={cn(
        filteredLinks ? 'flex' : 'hidden',
        'w-full flex-col overflow-hidden rounded-md border'
      )}
    >
      <div className="h-8 w-full">
        <button
          type="button"
          onClick={() => {
            open.value = !open.value
          }}
          className={cn(
            open.value ? 'border-b' : '',
            'flex size-full shrink-0 items-center justify-between overflow-hidden px-4'
          )}
        >
          <span>{tagTitle}</span>
          {open.value ? (
            <ChevronUpIcon className="size-4" />
          ) : (
            <ChevronDownIcon className="size-4" />
          )}
        </button>
      </div>
      <ul className={cn(open.value ? 'flex' : 'hidden', 'w-full flex-col')}>
        {filteredLinks.map((item) => (
          <li key={item.uid}>
            <TagGroupItem link={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
