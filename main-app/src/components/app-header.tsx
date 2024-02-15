import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import { auth } from '@/auth'
import AvatarDropdown from '@/components/avatar-dropdown'
import SignUpButton from '@/components/sign-up-button'
import ThemeToggle from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'

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
        {isAnySelectedLink ?? (
          <Button size="sm" variant="outline" asChild>
            <Link href="/main">
              <ArrowLeftIcon className="mr-2 size-4" />
              Back
            </Link>
          </Button>
        )}
      </div>
      <div className="col-span-3 flex items-center justify-center gap-2">
        {isAnySelectedLink ?? (
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
        )}
      </div>
      <div className="flex items-center justify-end gap-4 overflow-hidden">
        <ThemeToggle />
        <AvatarDropdown />
      </div>
    </div>
  )
}
