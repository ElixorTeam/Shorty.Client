import Link from 'next/link'

import AvatarDropdown from '@/features/avatar-dropdown'
import ThemeToggle from '@/features/theme-toggle'
import SignUpButton from '@/pages-flat/home/sign-up-button'
import { auth } from '@/shared/auth'
import { Button } from '@/shared/ui/button'
import Spotlight from '@/shared/ui/spotlight'
import TextGenerator from '@/shared/ui/text-generator'

export default async function HomePage() {
  const session = await auth()
  return (
    <div className="bg-grid-black/[.03] dark:bg-grid-white/[.02] min-h-screen">
      <header className="bg-background/[.95] supports-[backdrop-filter]:bg-background/[.6] border-border/[.4] sticky top-0 z-40 w-full border-b backdrop-blur">
        <div className="container flex h-16 items-center justify-between">
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
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" />
        <div className="my-16 flex flex-col items-center justify-center gap-6 px-6 text-center md:my-32">
          <TextGenerator
            words="Shorten, Manage, Analyze. Your key to efficient links."
            className="from from-primary to-muted-foreground bg-gradient-to-b bg-clip-text text-5xl font-semibold text-transparent"
          />
          <div className="max-w-screen-md">
            <TextGenerator
              words="Unlock the power of efficient linking. Our service offers a simple,
              user-friendly platform for shortening, managing, and analyzing your
              links."
              className="text-muted-foreground text-xl font-light"
            />
          </div>
          <Button size="lg" variant="outline" type="button" asChild>
            <Link href="/main">Get Started</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}
