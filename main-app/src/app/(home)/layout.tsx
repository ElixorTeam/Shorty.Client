import Link from 'next/link'
import { ReactNode } from 'react'

import SignUpButton from '@/components/sign-up-button'
import ThemeToggle from '@/components/theme-toggle'
import AvatarDropdown from '@/components/avatar-dropdown'
import { auth } from '@/auth'

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="fixed top-0 z-40 flex h-16 w-full shrink-0 items-center border-b bg-white/[.9] px-10 backdrop-blur supports-[backdrop-filter]:bg-white/[.6] dark:border-b-neutral-800 dark:bg-zinc-950/[.9] dark:supports-[backdrop-filter]:bg-zinc-950/[.6]">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
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
      <main className="mx-auto size-full max-w-screen-xl grow">{children}</main>
    </div>
  )
}
