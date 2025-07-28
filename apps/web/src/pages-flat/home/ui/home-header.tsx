import Link from 'next/link'

import { auth } from '@/shared/auth'
import { ROUTES } from '@/shared/consts/routes'

import { AvatarDropdown } from './avatar-dropdown'
import { SignUpButton } from './sign-up-button'
import { ThemeToggle } from './theme-toggle'

export async function HomeHeader() {
  const session = await auth()
  return (
    <header className="border-border/[.4] bg-background/[.95] supports-[backdrop-filter]:bg-background/[.6] sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between">
        <Link href={ROUTES.HOME}>
          <span className="text-2xl font-extrabold">
            Sho<span className="tracking-wide">r</span>
            <span className="tracking-wider">t</span>y
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          {session ? <AvatarDropdown /> : <SignUpButton />}
        </div>
      </div>
    </header>
  )
}
