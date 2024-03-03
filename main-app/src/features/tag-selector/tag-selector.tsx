import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { useState } from 'react'

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

import { type TagType } from './tag-type'

export default function TagSelector({
  currentTag,
  onCurrentTagChange,
  initialTags,
}: {
  currentTag: TagType | undefined
  onCurrentTagChange: (value: TagType) => void
  initialTags: TagType[]
}) {
  const [searchTag, setSearchTag] = useState<string>('')
  const [tags, setTags] = useState<TagType[]>(initialTags)

  const handleAddNewTag = () => {
    const newTag = {
      value: searchTag.trim().toLowerCase(),
      label: searchTag.trim(),
    }
    setTags([...tags, newTag])
    onCurrentTagChange(newTag)
  }
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className={cn(
            'w-[200px] justify-between',
            !currentTag?.value && 'text-muted-foreground'
          )}
        >
          {currentTag?.value
            ? tags.find((tag) => tag.value === currentTag?.value)?.label
            : 'Select language'}
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
            {searchTag.trim().length !== 0 &&
              !tags.find(
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
                onSelect={() => onCurrentTagChange(tag)}
              >
                <CheckIcon
                  className={cn(
                    'mr-2 h-4 w-4',
                    tag.value === currentTag?.value
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
