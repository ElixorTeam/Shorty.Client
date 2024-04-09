import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

import { type SubdomainType } from '@/features/subdomain-selector'
import cn from '@/shared/lib/tailwind-merge'
import { Button } from '@/shared/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/shared/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'

export default function SubdomainSelector({
  currentSubdomain,
  onCurrentSubdomainChange,
  initialSubdomains,
}: {
  currentSubdomain: SubdomainType | undefined
  onCurrentSubdomainChange: (value: SubdomainType) => void
  initialSubdomains: SubdomainType[]
}) {
  const [searchTag, setSearchTag] = useState<string>('')
  const [tags, setTags] = useState<SubdomainType[]>(initialSubdomains)

  const handleAddNewTag = () => {
    const newTag = {
      value: searchTag.trim().toLowerCase(),
      label: searchTag.trim(),
    }
    setTags([...tags, newTag])
    onCurrentSubdomainChange(newTag)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            'w-full justify-between rounded-r-none pr-2',
            !currentSubdomain?.value && 'text-muted-foreground'
          )}
        >
          <span className="truncate">
            {currentSubdomain?.value
              ? tags.find((tag) => tag.value === currentSubdomain?.value)?.label
              : 'Select subdomain'}
          </span>
          <ChevronUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={searchTag}
            onValueChange={setSearchTag}
            placeholder="Search language..."
          />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            {searchTag.trim().length > 0 &&
              !tags.some(
                (tag) => tag.value === searchTag.trim().toLowerCase()
              ) && (
                <CommandItem
                  value={searchTag.trim().toLowerCase()}
                  onSelect={handleAddNewTag}
                >
                  <PlusCircleIcon className="mr-2 size-4" />
                  {searchTag.trim()}
                </CommandItem>
              )}
            {tags.map((tag) => (
              <CommandItem
                value={tag.label}
                key={tag.value}
                onSelect={() => onCurrentSubdomainChange(tag)}
              >
                <CheckIcon
                  className={cn(
                    'mr-2 h-4 w-4',
                    tag.value === currentSubdomain?.value
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
                {tag.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
