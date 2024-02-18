'use client'

import { Input } from '@/shared/ui/input'
import { CreateLinkDialog } from '@/widgets/create-link-form/'

import { useSearchingString } from './selector-context'
import SortSelect from './sort-select'

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
        <CreateLinkDialog />
      </div>
    </div>
  )
}
