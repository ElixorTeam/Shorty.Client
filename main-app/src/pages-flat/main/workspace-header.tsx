import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import AvatarDropdown from '@/features/avatar-dropdown'
import ThemeToggle from '@/features/theme-toggle'
import LinkSuspense from '@/pages-flat/main/link-suspense'
import { Button } from '@/shared/ui/button'

export default async function WorkspaceHeader() {
  return (
    <div className="sticky top-0 z-20 grid h-14 w-full shrink-0 grid-cols-3 gap-4 border-b bg-background/[.95] px-6 backdrop-blur supports-[backdrop-filter]:bg-background/[.6] md:grid-cols-5">
      <div className="flex h-full items-center">
        <LinkSuspense>
          <Button size="sm" variant="outline" asChild>
            <Link href="/main">
              <ArrowLeftIcon className="mr-2 size-4" />
              Back
            </Link>
          </Button>
        </LinkSuspense>
      </div>
      <div className="flex items-center justify-center gap-2 md:col-span-3">
        <LinkSuspense>
          <Button variant="outline" size="icon" disabled>
            <ChevronLeftIcon className="size-4" />
          </Button>
          <Button variant="outline" size="icon" disabled>
            <ChevronRightIcon className="size-4" />
          </Button>
          <div className="hidden h-10 items-center overflow-hidden rounded-md bg-muted px-4 shadow-sm md:flex">
            <p className="truncate">Youtube link</p>
          </div>
        </LinkSuspense>
      </div>
      <div className="flex items-center justify-end gap-2 overflow-hidden md:gap-4">
        <ThemeToggle />
        <AvatarDropdown />
      </div>
    </div>
  )
}
