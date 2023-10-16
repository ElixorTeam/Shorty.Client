'use client'

import { Combobox } from '@headlessui/react'
import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { ChangeEvent, KeyboardEvent, useState } from 'react'
import toast from 'react-hot-toast'

const tags = ['Youtube', 'Vk']

export default function PanelTagInput({ tag }: { tag: string }) {
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedTag, setSelectedTag] = useState(tag)
  const [query, setQuery] = useState(tag)

  const filteredTags =
    query === ''
      ? tags
      : tags.filter((item) => item.toLowerCase().includes(query.toLowerCase()))

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && query !== '' && !tags.includes(query)) {
      tags.push(query)
      setSelectedTag(query)
    }
  }

  const handleBlur = () => {
    if (query !== '' && !tags.includes(query)) {
      tags.push(query)
      setSelectedTag(query)
    }
  }

  const handleSubmit = () => {
    toast.success(`Tag has been changed: ${selectedTag}`)
    setIsEditMode(false)
  }

  return isEditMode ? (
    <div className="flex h-8 w-full max-w-[12rem] items-center justify-center gap-2">
      <Combobox as="div" value={selectedTag} onChange={setSelectedTag}>
        <div className="relative mt-1">
          <Combobox.Input
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onBlur={handleBlur}
            className="w-full rounded-lg border border-black/[.15] bg-transparent px-2 py-1 pr-10 text-sm shadow-sm focus:border-black/[.15] focus:ring-0 dark:border-white/[.15]"
          />
        </div>
        {filteredTags.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-fit overflow-auto rounded-md border bg-gray-50 py-1 shadow-lg focus:outline-none dark:border-white/[.15] dark:bg-neutral-950">
            {filteredTags.map((item) => (
              <Combobox.Option
                key={item}
                value={item}
                className={({ active }) =>
                  clsx(
                    'relative cursor-default select-none px-3 py-1 pr-6 text-sm',
                    active
                      ? 'bg-gray-200 text-black dark:bg-neutral-900 dark:text-neutral-200'
                      : 'text-gray-600 dark:text-neutral-500'
                  )
                }
              >
                {item}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </Combobox>
      <button type="button" onClick={handleSubmit}>
        <CheckIcon className="h-4 w-4 text-gray-600 hover:text-gray-800 active:text-black dark:text-neutral-400 dark:hover:text-neutral-200 dark:active:text-white" />
      </button>
      <button type="button" onClick={() => setIsEditMode(false)}>
        <XMarkIcon className="h-4 w-4 text-gray-600 hover:text-gray-800 active:text-black dark:text-neutral-400 dark:hover:text-neutral-200 dark:active:text-white" />
      </button>
    </div>
  ) : (
    <div className="flex w-full items-center justify-center gap-1">
      <div className="overflow-hidden rounded-2xl border border-black/[.2] bg-gray-200 px-3 py-1 dark:border-white/[.1] dark:bg-neutral-800">
        <p className="text-sm">{tag}</p>
      </div>
      <button type="button" onClick={() => setIsEditMode(true)}>
        <PencilIcon className="h-4 w-4 text-gray-600 hover:text-gray-800 active:text-black dark:text-neutral-400 dark:hover:text-neutral-200 dark:active:text-white" />
      </button>
    </div>
  )
}
