import { CheckIcon, ChevronsDownUpIcon } from 'lucide-react'
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
import { Skeleton } from '@repo/ui/skeleton'

import { useGetClientDomains } from '@/entities/domain'
import { useFormContext } from './create-form-context'
import { useState } from 'react'

export default function DomainSelector() {
  const [search, setSearch] = useState<string>('')
  const {
    currentDomain,
    setCurrentDomain,
    setCurrentSubdomain,
    subdomainStub,
  } = useFormContext()
  const { data: domains, isLoading } = useGetClientDomains()

  if (isLoading || domains === undefined) {
    return (
      <Skeleton className="h-10 w-full overflow-hidden rounded-none border" />
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between rounded-none border-x-0 pr-2"
        >
          <span className="truncate">{currentDomain.value}</span>
          <ChevronsDownUpIcon className="ml-2 size-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput
            value={search}
            onValueChange={(value) => {
              setSearch(value)
            }}
            maxLength={16}
            placeholder="Search subdomain..."
          />
          <CommandList>
            <CommandEmpty>No domains found.</CommandEmpty>
            <CommandGroup>
              {domains.map((item) => (
                <CommandItem
                  value={item.value}
                  key={item.uid}
                  onSelect={() => {
                    if (currentDomain === item) return
                    setCurrentDomain(item)
                    setCurrentSubdomain(subdomainStub)
                  }}
                  disabled={false}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 size-4',
                      item.value === currentDomain.value
                        ? 'visible'
                        : 'invisible'
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
