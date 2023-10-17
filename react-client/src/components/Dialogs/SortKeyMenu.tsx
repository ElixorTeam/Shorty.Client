'use client'

import { Menu, Transition } from '@headlessui/react'
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'

import { sortOptions } from '@/shared/SortKeyEnum'
import useSortStore from '@/stores/sortStore'

export default function SortKeyMenu() {
  const sortKey = useSortStore((state) => state.sortKey)
  const setSortKey = useSortStore((state) => state.setSortKey)
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border bg-slate-100 transition hover:bg-white dark:border-white/[.15] dark:bg-neutral-900 dark:hover:bg-neutral-800">
        <ArrowsUpDownIcon className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -right-10 z-10 mt-2 w-28 rounded-md border bg-white shadow-lg dark:border-white/[.15] dark:bg-neutral-950">
          <ul className="w-full py-1">
            {sortOptions.map((item) => (
              <li key={item.id} className="h-8 w-full overflow-hidden">
                <Menu.Item>
                  <button
                    type="button"
                    onClick={() => setSortKey(item.value)}
                    className={clsx(
                      sortKey === item.value
                        ? 'bg-gray-100 text-gray-900 dark:bg-neutral-900 dark:text-neutral-300'
                        : 'text-gray-700 dark:text-neutral-600',
                      'inline-flex h-full w-full px-4 py-2'
                    )}
                  >
                    <p className="text-left text-sm">{item.label}</p>
                  </button>
                </Menu.Item>
              </li>
            ))}
          </ul>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
