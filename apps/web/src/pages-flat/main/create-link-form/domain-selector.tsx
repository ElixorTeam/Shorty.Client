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
import { CheckIcon, ChevronsDownIcon } from 'lucide-react'
import { useEffect, useState } from 'react'

import { rqClient } from '@/shared/api/instance'

import { useFormContext } from './create-form-context'

export default function DomainSelector() {
  const [search, setSearch] = useState<string>('')
  const { currentDomain, setCurrentDomain, setCurrentSubdomain } =
    useFormContext()
  const { data, isLoading } = rqClient.useQuery('get', '/user/subdomains')

  useEffect(() => {
    if (!currentDomain && data?.data && data.data.length > 0) {
      const first = data.data[0]
      setCurrentDomain({
        uid: first!.domainUid,
        value: first!.domainValue,
      })
    }
  }, [data, currentDomain, setCurrentDomain])

  if (isLoading || data?.data === undefined) {
    return (
      <Skeleton className="h-9 w-full overflow-hidden rounded-none border-y" />
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          className="h-9 w-full justify-between rounded-none border-x-0 pr-2"
        >
          <span className="truncate">{currentDomain?.value}</span>
          <ChevronsDownIcon className="ml-2 size-4 shrink-0 opacity-50" />
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
              {data?.data.map((item) => (
                <CommandItem
                  value={item.domainValue}
                  key={item.domainUid}
                  onSelect={() => {
                    const domainItem = {
                      uid: item.domainUid,
                      value: item.domainValue,
                    }
                    if (currentDomain === domainItem) return
                    setCurrentDomain(domainItem)
                  }}
                  disabled={false}
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 size-4',
                      item.domainValue === currentDomain?.value
                        ? 'visible'
                        : 'invisible'
                    )}
                  />
                  {item.domainValue}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
