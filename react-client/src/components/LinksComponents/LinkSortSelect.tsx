import { Listbox } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { SortOptionsType } from '@/shared/SortKeyEnum'

export default function LinkSortSelect({
  sortOptions,
  selectedSort,
  setSelectedSort
}: {
  sortOptions: SortOptionsType[]
  selectedSort: SortOptionsType
  setSelectedSort: (state: SortOptionsType) => void
}) {
  return (
    <Listbox value={selectedSort} onChange={setSelectedSort}>
      <Listbox.Button className="flex h-10 w-full items-center justify-between gap-2 px-10 transition-colors hover:bg-gray-50 active:bg-gray-100 dark:hover:bg-white/[.05] dark:active:bg-white/[.08]">
        <p>{selectedSort.label}</p>
        <ChevronUpDownIcon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
      </Listbox.Button>
      <Listbox.Options className="absolute z-[100] mt-1 rounded-md border border-neutral-300 bg-white py-1 shadow-lg backdrop-blur-md dark:border-neutral-700 dark:bg-[#2a2633]">
        {sortOptions.map(item => (
          <Listbox.Option
            key={item.id}
            value={item}
            className="cursor-pointer px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[.05]"
          >
            {item.label}
          </Listbox.Option>
        ))}
      </Listbox.Options>
    </Listbox>
  )
}
