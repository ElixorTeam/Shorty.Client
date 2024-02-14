import {
  ArrowLeftIcon,
  ArrowUturnLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import { auth, signOut } from '@/auth'
import ThemeToggle from '@/components/theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default async function AppHeader({
  linkUID,
}: {
  linkUID: string | string[] | undefined
}) {
  const isAnySelectedLink = !!linkUID
  const session = await auth()
  return (
    <div className="sticky top-0 z-20 grid h-14 w-full shrink-0 grid-cols-5 gap-4 border-b border-b-black/[.1] bg-zinc-50/[.5] px-6 backdrop-blur dark:border-b-white/[.15] dark:bg-zinc-950/[.3]">
      <div className="flex h-full items-center">
        {isAnySelectedLink ? (
          <Button size="sm" variant="outline" asChild>
            <Link href="/app">
              <ArrowLeftIcon className="mr-2 size-4" />
              Back
            </Link>
          </Button>
        ) : (
          ''
        )}
      </div>
      <div className="col-span-3 flex items-center justify-center gap-2">
        {isAnySelectedLink ? (
          <>
            <Button variant="outline" size="icon" disabled>
              <ChevronLeftIcon className="size-4" />
            </Button>
            <Button variant="outline" size="icon" disabled>
              <ChevronRightIcon className="size-4" />
            </Button>
            <div className="flex h-10 items-center overflow-hidden rounded-md bg-zinc-100 px-4 shadow-sm dark:bg-zinc-900">
              <p className="truncate">Youtube link</p>
            </div>
          </>
        ) : (
          ''
        )}
      </div>
      <div className="flex items-center justify-end gap-4 overflow-hidden">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-2">
            <span className="hidden truncate font-medium lg:block">
              {session?.user?.name}
            </span>
            <Avatar className="size-8">
              <AvatarImage src={session?.user?.image!} alt="user-avatar" />
              <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <form
              action={async () => {
                'use server'

                await signOut()
              }}
            >
              <DropdownMenuItem asChild>
                <button
                  type="submit"
                  className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50"
                >
                  Sign out
                </button>
              </DropdownMenuItem>
            </form>
            <DropdownMenuItem>Admin</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </div>
  )
}
