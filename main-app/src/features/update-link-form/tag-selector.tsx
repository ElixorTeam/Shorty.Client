import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { useComputed, useSignal } from '@preact-signals/safe-react'
import { v4 as uuidv4 } from 'uuid'

import { type TagType, useGetAllTags } from '@/entities/tag'
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

import { tagStub, currentTag } from './update-form-context'

export default function TagSelector() {
  const search = useSignal<string>('')
  const createdTags = useSignal<TagType[]>([])
  const { data: tagsData } = useGetAllTags()

  const tags = useComputed<TagType[]>(() => [
    ...(tagsData === undefined
      ? []
      : tagsData.filter((tag) => tag.value.trim())),
    ...createdTags.value,
    tagStub.value,
  ])

  const handleAddNewTag = () => {
    const newTag: TagType = {
      value: search.value.trim(),
      uid: uuidv4(),
    }
    currentTag.value = newTag
    createdTags.value = [...createdTags.value, newTag]
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between sm:w-72"
        >
          <span className="truncate">{currentTag.value.value}</span>
          <ChevronUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={search.value}
            onValueChange={(value) => {
              search.value = value
            }}
            maxLength={16}
            placeholder="Search tag..."
          />
          <CommandEmpty>No tag found.</CommandEmpty>
          <CommandGroup>
            {search.value.trim().length > 0 &&
              !tags.value.some(
                (tag) => tag.value === search.value.trim().toLowerCase()
              ) && (
                <CommandItem
                  value={search.value.trim().toLowerCase()}
                  onSelect={handleAddNewTag}
                >
                  <PlusCircleIcon className="mr-2 size-4" />
                  {search}
                </CommandItem>
              )}
            {tags.value.map((item) => (
              <CommandItem
                value={item.value}
                key={item.uid}
                onSelect={() => {
                  currentTag.value = item
                }}
              >
                <CheckIcon
                  className={cn(
                    'mr-2 size-4',
                    item.value === currentTag.value.value
                      ? 'visible'
                      : 'invisible'
                  )}
                />
                {item.value}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
