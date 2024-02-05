'use client'

import { sortOptions } from '@/components/link-selector/sort-key-enum'
import { useSortKey } from '@/components/link-selector/selector-context'
import { Button } from '@/components/ui/button'
import { ArrowsUpDownIcon } from '@heroicons/react/24/outline'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function SortSelect() {
  const { sortKey, setSortKey } = useSortKey()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ArrowsUpDownIcon className="h-4 w-4" />
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
