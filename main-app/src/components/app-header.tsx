import Link from 'next/link'
import { Button } from '@/components/ui/button'
import {
  ArrowLeftIcon,
  ArrowUturnLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import avatar_artyom from '@/public/avatar_artyom.jpg'
import { ThemeToggle } from '@/components/theme-toggle'

export default function AppHeader({
  linkUID,
}: {
  linkUID: string | string[] | undefined
}) {
  const isAnySelectedLink = !!linkUID
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
            <p className="hidden truncate font-medium lg:block">
              Artyom Vlasov
            </p>
            <Avatar className="size-8">
              <AvatarImage src={avatar_artyom.src} alt="link-icon" />
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <ArrowUturnLeftIcon className="mr-2 size-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
    </div>
  )
}
