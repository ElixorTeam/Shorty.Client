import Link from 'next/link'

import { auth } from '@/auth'
import AvatarDropdown from '@/features/avatar-dropdown'
import ThemeToggle from '@/features/theme-toggle'
import { Button } from '@/shared/ui/button'
import SignUpButton from '@/views/home/sign-up-button'

export default async function HomePage() {
  const session = await auth()
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="fixed top-0 z-40 flex h-16 w-full shrink-0 items-center border-b bg-white/[.9] px-10 backdrop-blur supports-[backdrop-filter]:bg-white/[.6] dark:border-b-neutral-800 dark:bg-zinc-950/[.9] dark:supports-[backdrop-filter]:bg-zinc-950/[.6]">
        <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
          <Link href="/main-app/public">
            <span className="text-2xl font-extrabold">
              Sho<span className="tracking-wide">r</span>
              <span className="tracking-wider">t</span>y
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {session ? (
              <AvatarDropdown user={session.user} />
            ) : (
              <SignUpButton />
            )}
          </div>
        </div>
      </header>
      <main className="mx-auto size-full max-w-screen-xl grow">
        <div className="my-32 flex flex-col items-center justify-center gap-6 px-6 text-center md:my-64">
          <p className="bg-gradient-to-b from-gray-500 to-gray-900 bg-clip-text pb-2 text-3xl font-semibold text-transparent dark:from-neutral-100 dark:to-neutral-500 md:text-5xl">
            Shorten, Manage, Analyze. Your key to efficient links.
          </p>
          <p className="max-w-screen-md font-light text-gray-600 dark:text-neutral-400 md:text-xl">
            Unlock the power of efficient linking. Our service offers a simple,
            user-friendly platform for shortening, managing, and analyzing your
            links.
          </p>
          <Button size="lg" type="button" asChild>
            <Link href="/main">Get Started</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
