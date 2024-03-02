import Link from 'next/link'

import AvatarDropdown from '@/features/avatar-dropdown'
import ThemeToggle from '@/features/theme-toggle'
import SignUpButton from '@/pages-flat/home/sign-up-button'
import { auth } from '@/shared/auth'

export default async function HomeHeader() {
  const session = await auth()
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/[.4] bg-background/[.95] backdrop-blur supports-[backdrop-filter]:bg-background/[.6]">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/">
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
