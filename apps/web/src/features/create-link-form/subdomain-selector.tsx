import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { computed, useSignal } from '@preact-signals/safe-react'
import { Button } from '@repo/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@repo/ui/command'
import { cn } from '@repo/ui/lib/utils'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { Skeleton } from '@repo/ui/skeleton'
import { useToast } from '@repo/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'

import {
  createSubdomainAction,
  deleteSubdomainAction,
  type SubdomainType,
  useGetAllSubdomains,
} from '@/entities/subdomain'

import { currentSubdomain, subdomainStub } from './create-form-context'

export default function SubdomainSelector({
  currentDomainUid,
}: {
  currentDomainUid: string
}) {
  const { toast } = useToast()
  const queryClient = useQueryClient()
  const search = useSignal<string>('')
  const { data: subdomainsQueryData, isLoading } = useGetAllSubdomains()

  const subdomains = computed<SubdomainType[]>(() => [
    ...(subdomainsQueryData?.filter(
      (item) => item.domainUid == currentDomainUid
    ) ?? []),
    subdomainStub.value,
  ])

  const handleAddSubdomain = async () => {
    const result = await createSubdomainAction({
      value: search.value.trim(),
      domainUid: currentDomainUid,
    })

    if (!result || !result.data || 'failure' in result.data) {
      toast({
        title: 'Form error',
        description: result?.data?.failure,
        variant: 'destructive',
      })
      return
    }

    queryClient.setQueryData(
      ['subdomains'],
      (oldData: SubdomainType[] | undefined) => [
        ...(oldData ?? []),
        result.data,
      ]
    )
    currentSubdomain.value = result.data.data
  }

  const handleDeleteSubdomain = async (subdomainUid: string) => {
    const result = await deleteSubdomainAction({ uid: subdomainUid })

    if (!result || !result.data || 'failure' in result.data) {
      toast({
        title: 'Form error',
        description: result?.data?.failure,
        variant: 'destructive',
      })
      return
    }

    queryClient.setQueryData(
      ['subdomains'],
      (oldData: SubdomainType[] | undefined) =>
        (oldData ?? []).filter((item) => item.uid !== subdomainUid)
    )

    if (currentSubdomain.value.uid !== subdomainStub.value.uid)
      currentSubdomain.value = subdomainStub.value

    toast({ title: 'Successfully deleted' })
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
            placeholder="Search subdomain..."
          />
          <CommandEmpty>No subdomains found.</CommandEmpty>
          <CommandGroup>
            {search.value.trim().length > 0 &&
              subdomains.value.length <= 6 &&
              !subdomains.value.some(
                (item) => item.value === search.value.trim().toLowerCase()
              ) && (
                <CommandItem
                  value={search.value.trim().toLowerCase()}
                  onSelect={handleAddSubdomain}
                >
                  <PlusCircleIcon className="mr-2 size-4" />
                  {search}
                </CommandItem>
              )}
            {subdomains.value.map((item) => (
              <CommandItem
                value={item.value}
                key={item.uid}
                onSelect={() => {
                  currentSubdomain.value = item
                }}
                className="relative"
              >
                <CheckIcon
                  className={cn(
                    'mr-2 size-4',
                    item.value === currentSubdomain.value.value
                      ? 'visible'
                      : 'invisible'
                  )}
                />
                {item.value}
                {item.uid !== subdomainStub.value.uid && (
                  <button
                    type="button"
                    onClick={() => handleDeleteSubdomain(item.uid)}
                    className="absolute right-2 top-2"
                  >
                    <TrashIcon className="text-destructive size-4" />
                    <span className="sr-only">Delete {item.value}</span>
                  </button>
                )}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
