import { Button } from '@repo/ui/button'
import { Logo } from '@repo/ui/logo'
import Link from 'next/link'

import { auth, signIn } from '@/shared/auth'
import { ROUTES } from '@/shared/consts/routes'

import { AvatarDropdown } from './avatar-dropdown'
import { ThemeToggle } from './theme-toggle'

export async function NavigationBar() {
  const session = await auth()
  return (
    <nav className="bg-background fixed z-10 h-11 w-full border-b">
      <div className="mx-auto flex size-full max-w-7xl items-center justify-between px-2 md:px-4">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="flex shrink-0 items-center justify-start p-2 px-3"
        >
          <Link href={ROUTES.HOME}>
            <Logo stroke="currentColor" className="size-18 stroke-[0.05]" />
          </Link>
        </Button>
        <div className="flex items-center gap-2 pr-2">
          <ThemeToggle />
          {!session ? (
            <form
              action={async () => {
                'use server'

                await signIn('keycloak')
              }}
            >
              <Button
                variant="outline"
                size="sm"
                type="submit"
                className="px-3 py-0"
              >
                Sign up
              </Button>
            </form>
          ) : (
            <AvatarDropdown />
          )}
        </div>
      </div>
    </nav>
  )
}
