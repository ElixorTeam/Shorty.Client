'use client'

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useSearchingString } from './selector-context'
import SortSelect from './sort-select'
import { Input } from '../ui/input'

export default function SelectorHeader() {
  const { searchingString, setSearchingString } = useSearchingString()

  return (
    <div className="my-4 flex w-full items-center justify-between gap-2 px-3">
      <Input
        type="text"
        placeholder="Search link..."
        value={searchingString}
        onChange={(event) => setSearchingString(event.target.value)}
      />
      <div className="flex gap-2">
        <SortSelect />
        {/* <AddNewLinkDialog /> */}
      </div>
    </div>
  )
}
