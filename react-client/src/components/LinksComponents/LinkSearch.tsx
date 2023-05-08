import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

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
    <>
      <MagnifyingGlassIcon className="h-5 w-5 stroke-gray-400" />
      <input
        placeholder={placeholderText}
        value={searchText}
        onChange={event => setSearchString(event.target.value)}
        className="w-full bg-white/[.0] placeholder:text-base focus:outline-none"
      />
    </>
  )
}
