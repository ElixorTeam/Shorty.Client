'use client'

import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setSearchText } from '@/redux/Slices/searchTextSlice'

export default function NavigationSearchBar({
  placeholderText,
}: {
  placeholderText: string
}) {
  const dispatch = useAppDispatch()
  const searchText = useAppSelector((state) => state.searchText.text)
  return (
    <div className="flex w-full items-center justify-between pr-[26px]">
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5 stroke-gray-400" />
        <input
          placeholder={placeholderText}
          value={searchText}
          onChange={(event) => dispatch(setSearchText(event.target.value))}
          className="w-full bg-white/[.0] placeholder:text-base focus:outline-none"
        />
      </div>
      <div>
        {searchText && (
          <button type="button" onClick={() => dispatch(setSearchText(''))}>
            <XMarkIcon className="mt-1 h-4 w-4 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" />
          </button>
        )}
      </div>
    </div>
  )
}
