import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
} from '@heroicons/react/24/outline'
import { useComputed, useSignal } from '@preact-signals/safe-react'

import {
  createSubdomainAction,
  type SubdomainType,
  useGetAllSubdomains,
} from '@/entities/subdomain'
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
import Skeleton from '@/shared/ui/skeleton'
import { useToast } from '@/shared/ui/use-toast'

import { currentSubdomain, subdomainStub } from './create-form-context'

export default function SubdomainSelector({
  currentDomainUid,
}: {
  currentDomainUid: string
}) {
  const { toast } = useToast()
  const search = useSignal<string>('')
  const { data, isLoading, refetch } = useGetAllSubdomains(currentDomainUid)
  const subdomains = useComputed<SubdomainType[]>(() => [
    ...(data ?? []),
    subdomainStub,
  ])

  const handleAddNewTag = async () => {
    const res = await createSubdomainAction({
      value: search.value.trim(),
      domainUid: currentDomainUid,
    })

    const { data: actionData, serverError, validationErrors } = res

    if (
      actionData === undefined ||
      actionData?.failure ||
      serverError ||
      validationErrors
    ) {
      toast({
        title: 'Form error',
        description: actionData?.failure,
        variant: 'destructive',
      })
      return
    }

    await refetch()
    currentSubdomain.value = actionData.data
  }
  if (isLoading || subdomains === undefined) {
    return (
      <Skeleton className="h-10 w-full overflow-hidden rounded-md rounded-r-none border" />
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between rounded-r-none pr-2"
        >
          <span className="truncate">{currentSubdomain.value.value}</span>
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
            placeholder="Search language..."
          />
          <CommandEmpty>No subdomains found.</CommandEmpty>
          <CommandGroup>
            {search.value.trim().length > 0 &&
              !subdomains.value.some(
                (item) => item.value === search.value.trim().toLowerCase()
              ) && (
                <CommandItem
                  value={search.value.trim().toLowerCase()}
                  onSelect={handleAddNewTag}
                >
                  <PlusCircleIcon className="mr-2 size-4" />
                  {search.value.trim()}
                </CommandItem>
              )}
            {subdomains.value.map((item) => (
              <CommandItem
                value={item.value}
                key={item.uid}
                onSelect={() => {
                  currentSubdomain.value = item
                }}
              >
                <CheckIcon
                  className={cn(
                    'mr-2 h-4 w-4',
                    item.value === currentSubdomain.value.value
                      ? 'opacity-100'
                      : 'opacity-0'
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
