'use client'

import { ArrowUpDownIcon } from 'lucide-react'
import { Button } from '@repo/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown-menu'

import { useSortKey } from './selector-context'
import { sortOptions } from './sort-key-enum'

export default function SortSelect() {
  const { sortKey, setSortKey } = useSortKey()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <ArrowUpDownIcon className="size-4" />
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
