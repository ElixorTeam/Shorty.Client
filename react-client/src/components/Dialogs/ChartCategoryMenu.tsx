import { Listbox, Transition } from '@headlessui/react'
import { ChevronUpDownIcon } from '@heroicons/react/24/outline'
import { Dispatch, Fragment, SetStateAction } from 'react'

import cn from '@/utils/classNames'

export default function ChartCategoryMenu({
  categories,
  selectedCategory,
  setSelectedCategory,
}: {
  categories: string[]
  selectedCategory: string
  setSelectedCategory: Dispatch<SetStateAction<string>>
}) {
  return (
    <Listbox value={selectedCategory} onChange={setSelectedCategory}>
      {({ open }) => (
        <div className="relative">
          <Listbox.Button className="relative h-full w-28 rounded-lg border border-black/[.1] bg-sky-400 px-3 py-1 text-left transition-colors hover:bg-sky-300 dark:border-white/[.2] dark:bg-transparent dark:hover:bg-neutral-900">
            <span className="truncate text-white">{selectedCategory}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon className="h-5 w-5 stroke-[1.2] text-white" />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-black/[.1] bg-gray-50 py-1 text-sm shadow-lg dark:border-white/[.15] dark:bg-neutral-950">
              {categories.map((item) => (
                <Listbox.Option
                  key={item}
                  className={({ active, selected }) =>
                    cn(
                      'relative cursor-pointer py-2 pl-3 pr-9 text-gray-600 dark:text-neutral-500',
                      active && 'bg-gray-100 dark:bg-neutral-900/[.6]',
                      selected &&
                        'bg-gray-200 font-semibold text-black dark:bg-neutral-900 dark:text-white'
                    )
                  }
                  value={item}
                >
                  <p className="truncate">{item}</p>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}
