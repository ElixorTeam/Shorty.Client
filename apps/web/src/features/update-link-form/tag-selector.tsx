import { CheckIcon, ChevronsUpDownIcon, PlusCircleIcon } from 'lucide-react'
import { Button } from '@repo/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/command'
import { cn } from '@repo/ui/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { v4 as uuidv4 } from 'uuid'

import { useTagContext } from './update-form-context'

import { type TagType, useGetAllTags } from '@/entities/tag'
import { useMemo, useState } from 'react'

export default function TagSelector() {
  const [search, setSearch] = useState<string>('')
  const [createdTags, setCreatedTags] = useState<TagType[]>([])
  const { currentTag, setCurrentTag, tagStub } = useTagContext()
  const { data: tagsData } = useGetAllTags()

  const tags = useMemo<TagType[]>(() => {
    const cleanedTags = tagsData?.filter((tag) => tag.value.trim()) ?? []
    return [...cleanedTags, ...createdTags, tagStub]
  }, [tagsData, createdTags])

  const handleAddNewTag = () => {
    const newTag: TagType = {
      value: search.trim(),
      uid: uuidv4(),
    }
    setCurrentTag(newTag)
    setCreatedTags((prev) => [...prev, newTag])
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between sm:w-72"
        >
          <span className="truncate">{currentTag.value}</span>
          <ChevronsUpDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-72 p-0">
        <Command>
          <CommandInput
            value={search}
            onValueChange={(value) => {
              setSearch(value)
            }}
            maxLength={16}
            placeholder="Search tag..."
          />
          <CommandList>
            <CommandEmpty>No tag found.</CommandEmpty>
            <CommandGroup>
              {search.trim().length > 0 &&
                !tags.some(
                  (tag) => tag.value === search.trim().toLowerCase()
                ) && (
                  <CommandItem
                    value={search.trim().toLowerCase()}
                    onSelect={handleAddNewTag}
                  >
                    <PlusCircleIcon className="mr-2 size-4" />
                    {search}
                  </CommandItem>
                )}
              {tags.map((item) => (
                <CommandItem
                  value={item.value}
                  key={item.uid}
                  onSelect={() => {
                    setCurrentTag(item)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 size-4',
                      item.value === currentTag.value ? 'visible' : 'invisible'
                    )}
                  />
                  {item.value}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
