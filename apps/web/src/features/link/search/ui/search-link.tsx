'use client'

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@repo/ui/command'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog'
import { SidebarMenuButton } from '@repo/ui/sidebar'
import { SearchIcon } from 'lucide-react'
import { useState } from 'react'

import { LinkAvatar, useGetLinks } from '@/entities/link'
import { ParsedLink } from '@/entities/link'

export function SearchLink({
  onItemSelect,
  ...props
}: { onItemSelect?: (itemUid: ParsedLink) => void } & React.ComponentProps<
  typeof SidebarMenuButton
>) {
  const [open, setOpen] = useState(false)
  const { data: links } = useGetLinks()
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton {...props}>
          <SearchIcon className="size-4" />
          <span>Search...</span>
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="rounded-xl border-none bg-clip-padding p-2 pb-11 shadow-2xl dark:bg-neutral-900 dark:ring-neutral-800"
      >
        <DialogHeader className="sr-only">
          <DialogTitle>Search documentation...</DialogTitle>
          <DialogDescription>Search for a command to run...</DialogDescription>
        </DialogHeader>
        <Command className="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input rounded-none bg-transparent **:data-[slot=command-input]:!h-9 **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:!h-9 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border">
          <CommandInput placeholder="Search..." />
          <CommandList className="no-scrollbar min-h-80 scroll-pt-2 scroll-pb-1.5 pt-2">
            <CommandEmpty className="text-muted-foreground py-12 text-center text-sm">
              No results found.
            </CommandEmpty>
            {links?.map((item) => (
              <CommandItem
                key={item.uid}
                value={item.title}
                keywords={[
                  item.title,
                  item.path,
                  ...item.urls.map((url) => url.toString()),
                ]}
                onSelect={() => {
                  onItemSelect?.(item)
                  setOpen(false)
                }}
                className="data-[selected=true]:border-input data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent !px-3 font-medium"
              >
                <LinkAvatar link={item} className="size-4" />
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
