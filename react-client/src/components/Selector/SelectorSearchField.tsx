'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import useSearchStore from '@/stores/searchStore'

export default function SelectorSearchField() {
  const searchString = useSearchStore((state) => state.searchString)
  const setSearchString = useSearchStore((state) => state.setSearchString)
  return (
    <div className="mb-[1px] flex h-full w-full items-center gap-2">
      <MagnifyingGlassIcon className="ml-2 mt-[1px] h-4 w-4 shrink-0 text-gray-500 dark:text-neutral-600" />
      <input
        type="text"
        value={searchString}
        placeholder="Search by name..."
        onChange={(event) => setSearchString(event.target.value)}
        className="m-0 h-8 w-full border-none bg-transparent p-0 focus:ring-0 dark:placeholder:text-neutral-600"
      />
    </div>
  )
}
