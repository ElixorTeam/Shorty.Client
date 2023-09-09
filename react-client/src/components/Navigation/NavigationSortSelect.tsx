'use client'

import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setLinksSort } from '@/redux/Slices/linksSortSlice'
import { sortOptions } from '@/shared/SortKeyEnum'

export default function NavigationSortSelect({
  translate,
}: {
  translate: { [_: string]: string }
}) {
  const selectedSort = useAppSelector((state) => state.linksSort.selectedSort)
  const dispatch = useAppDispatch()
  return (
    <Listbox
      value={selectedSort}
      onChange={(value) => dispatch(setLinksSort(value))}
    >
      <Listbox.Button className="flex h-10 w-full items-center justify-between gap-2 px-10 transition-colors hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-white/[.05] dark:active:bg-white/[.08]">
        <p>{translate[selectedSort.label]}</p>
        <ChevronUpDownIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </Listbox.Button>
      <Listbox.Options className="absolute z-10 mt-1 w-full overflow-auto rounded-md border border-neutral-300 bg-white py-1 shadow-lg backdrop-blur-md dark:border-neutral-700 dark:bg-[#2a2633]">
        {sortOptions.map((item) => (
          <Listbox.Option
            key={item.id}
            value={item}
            className="w-full cursor-pointer px-10 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-sky-900 dark:text-gray-300 dark:hover:bg-white/[.05]"
          >
            {translate[item.label]}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
