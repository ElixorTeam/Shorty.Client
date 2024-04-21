import {
  CheckIcon,
  ChevronUpDownIcon,
  PlusCircleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import { computed, useSignal } from '@preact-signals/safe-react'
import { useQueryClient } from '@tanstack/react-query'

import {
  createSubdomainAction,
  deleteSubdomainAction,
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
  const queryClient = useQueryClient()
  const search = useSignal<string>('')
  const { data: subdomainsQueryData, isLoading } =
    useGetAllSubdomains(currentDomainUid)

  const subdomains = computed<SubdomainType[]>(() => [
    ...(subdomainsQueryData ?? []),
    subdomainStub.value,
  ])

  const handleAddSubdomain = async () => {
    const result = await createSubdomainAction({
      value: search.value.trim(),
      domainUid: currentDomainUid,
    })

    const { data: actionData, serverError, validationErrors } = result

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

    queryClient.setQueryData(
      ['subdomains', { id: currentDomainUid }],
      (oldData: SubdomainType[] | undefined) => [
        ...(oldData ?? []),
        actionData.data,
      ]
    )
    currentSubdomain.value = actionData.data
  }

  const handleDeleteSubdomain = async (subdomainUid: string) => {
    const result = await deleteSubdomainAction({ uid: subdomainUid })

    const { data: actionData, serverError, validationErrors } = result

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

    queryClient.setQueryData(
      ['subdomains', { id: currentDomainUid }],
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
                    <TrashIcon className="size-4 text-destructive" />
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
