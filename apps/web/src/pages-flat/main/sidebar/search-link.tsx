'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
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
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { rqClient } from '@/shared/api/instance'
import ROUTES from '@/shared/routes'

export default function SearchLink() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { data } = rqClient.useQuery('get', '/user/links')
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <SidebarMenuButton>
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
        <Command className="**:data-[slot=command-input-wrapper]:bg-input/50 **:data-[slot=command-input-wrapper]:border-input **:data-[slot=command-input]:!h-9 **:data-[slot=command-input]:py-0 **:data-[slot=command-input-wrapper]:mb-0 **:data-[slot=command-input-wrapper]:!h-9 **:data-[slot=command-input-wrapper]:rounded-md **:data-[slot=command-input-wrapper]:border rounded-none bg-transparent">
          <CommandInput placeholder="Search..." />
          <CommandList className="no-scrollbar min-h-80 scroll-pb-1.5 scroll-pt-2 pt-2">
            <CommandEmpty className="text-muted-foreground py-12 text-center text-sm">
              No results found.
            </CommandEmpty>
            {data?.data?.map((item) => (
              <CommandItem
                key={item.uid}
                value={item.title}
                keywords={[item.title, item.path, ...item.urls]}
                onSelect={() => {
                  router.push(`${ROUTES.LINKS}/${item.uid}`)
                  setOpen(false)
                }}
                className="data-[selected=true]:border-input data-[selected=true]:bg-input/50 h-9 rounded-md border border-transparent !px-3 font-medium"
              >
                {item.urls.length === 1 ? (
                  <Avatar className="mx-0.5 size-4 rounded-none">
                    <AvatarImage
                      src={`http://www.google.com/s2/favicons?domain=${item.urls[0] ?? ''}`}
                      alt="avatar"
                    />
                    <AvatarFallback>{item.title[0]}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="bg-muted flex size-5 items-center justify-center overflow-hidden rounded-full">
                    <span className="text-xs">{item.urls.length}</span>
                  </div>
                )}
                <span>{item.title}</span>
              </CommandItem>
            ))}
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  )
}
