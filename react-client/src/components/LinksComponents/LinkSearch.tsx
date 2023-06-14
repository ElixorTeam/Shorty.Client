import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'

export default function LinkSearch({
  searchText,
  setSearchString,
  placeholderText
}: {
  searchText: string
  setSearchString: (state: string) => void
  placeholderText: string
}) {
  return (
    <div className="flex w-full items-center justify-between pr-[26px]">
      <div className="flex items-center gap-2">
        <MagnifyingGlassIcon className="h-5 w-5 stroke-gray-400" />
        <input
          placeholder={placeholderText}
          value={searchText}
          onChange={event => setSearchString(event.target.value)}
          className="w-full bg-white/[.0] placeholder:text-base focus:outline-none"
        />
      </div>
      <div>
        {searchText && (
          <button type="button" onClick={() => setSearchString('')}>
            <XMarkIcon className="mt-1 h-4 w-4 text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200" />
          </button>
        )}
      </div>
    </div>
  )
}
