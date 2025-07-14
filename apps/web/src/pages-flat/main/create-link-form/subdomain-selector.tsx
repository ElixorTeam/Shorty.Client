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
import { useQueryClient } from '@tanstack/react-query'
import {
  CheckIcon,
  ChevronsDownUpIcon,
  PlusCircleIcon,
  TrashIcon,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { toast } from 'sonner'

import { type SubdomainType } from '@/entities/subdomain'

import { useFormContext } from './create-form-context'

export default function SubdomainSelector({
  currentDomainUid,
}: {
  currentDomainUid: string
}) {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState<string>('')
  const { currentSubdomain, setCurrentSubdomain, subdomainStub } =
    useFormContext()
  const [isLoading, setIsLoading] = useState(true)
  const [subdomainsQueryData, setDomains] = useState<SubdomainType[]>([])

  const subdomains = useMemo(
    () => [
      ...(subdomainsQueryData?.filter(
        (item) => item.domainUid == currentDomainUid
      ) ?? []),
      subdomainStub,
    ],
    [subdomainsQueryData, currentDomainUid]
  )

  const handleAddSubdomain = async () => {
    toast('Form error')
    // const result = await createSubdomainAction({
    //   value: search.trim(),
    //   domainUid: currentDomainUid,
    // })

    // if (!result?.data || 'failure' in result.data) {
    //   toast('Form error', {
    //     description: result?.data?.failure,
    //   })
    //   return
    // }

    // queryClient.setQueryData(
    //   ['subdomains'],
    //   (oldData: SubdomainType[] | undefined) => [
    //     ...(oldData ?? []),
    //     result.data,
    //   ]
    // )
    // setCurrentSubdomain(result.data.data)
  }

  const handleDeleteSubdomain = async (subdomainUid: string) => {
    toast('Form error')
    // const result = await deleteSubdomainAction({ uid: subdomainUid })

    // if (!result?.data || 'failure' in result.data) {
    //   toast('Form error', {
    //     description: result?.data?.failure,
    //   })
    //   return
    // }

    // queryClient.setQueryData(
    //   ['subdomains'],
    //   (oldData: SubdomainType[] | undefined) =>
    //     (oldData ?? []).filter((item) => item.uid !== subdomainUid)
    // )

    // if (currentSubdomain.uid !== subdomainStub.uid)
    //   setCurrentSubdomain(subdomainStub)

    // toast('Successfully deleted')
  }

  if (isLoading) {
    return (
      <Skeleton className="h-9 w-full overflow-hidden rounded-md rounded-r-none border" />
    )
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          className="w-full justify-between rounded-r-none pr-2"
        >
          <span className="truncate">{currentSubdomain.value}</span>
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
            <CommandEmpty>No subdomains found.</CommandEmpty>
            <CommandGroup>
              {search.trim().length > 0 &&
                subdomains.length <= 6 &&
                !subdomains.some(
                  (item) => item.value === search.trim().toLowerCase()
                ) && (
                  <CommandItem
                    value={search.trim().toLowerCase()}
                    onSelect={handleAddSubdomain}
                  >
                    <PlusCircleIcon className="mr-2 size-4" />
                    {search}
                  </CommandItem>
                )}
              {subdomains.map((item) => (
                <CommandItem
                  value={item.value}
                  key={item.uid}
                  onSelect={() => {
                    setCurrentSubdomain(item)
                  }}
                  className="relative"
                >
                  <CheckIcon
                    className={cn(
                      'mr-2 size-4',
                      item.value === currentSubdomain.value
                        ? 'visible'
                        : 'invisible'
                    )}
                  />
                  {item.value}
                  {item.uid !== subdomainStub.uid && (
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
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
