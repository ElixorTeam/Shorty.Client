'use client'

import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'

import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { useSortKey } from '@/widgets/link-selector/selector-context'
import { sortOptions } from '@/widgets/link-selector/sort-key-enum'

export default function SortSelect() {
  const { sortKey, setSortKey } = useSortKey()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ArrowsUpDownIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44">
        <DropdownMenuLabel>Sorting</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={sortKey} onValueChange={setSortKey}>
          {sortOptions.map((item) => (
            <DropdownMenuRadioItem key={item.id} value={item.value}>
              {item.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
