'use client'

import { ChevronUpIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import { useState } from 'react'

import LinkSelectorItem from '@/components/Selectors/LinkSelectorItem'
import { LinkRecordType } from '@/shared/LinkRecordType'

export default function LinkGroup({
  tagTitle,
  links,
}: {
  tagTitle: string
  links: LinkRecordType[]
}) {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className="flex w-full flex-col">
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
        {links.map((item) => (
          <li key={item.uid}>
            <LinkSelectorItem link={item} />
          </li>
        ))}
      </ul>
    </div>
  )
}
