import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { ReactNode } from 'react'

import ThemeToggle from '@/features/theme-toggle'
import NavigationHeader from '@/pages-flat/main/navigation-header'
import { auth, signOut } from '@/shared/auth'
import { Button } from '@/shared/ui/button'

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  const user = session?.user
  return (
    <div className="relative h-screen w-full">
      <div className="mx-auto flex size-full max-w-[120rem] grow">
        <div className="grid size-full grid-cols-[16rem_1fr]">
          <nav className="flex size-full grow flex-col border-r">
            <NavigationHeader />
            <div className="flex size-full grow justify-center px-4 py-3">
              <Link href="/admin/domains">Domains</Link>
            </div>
            <div className="flex h-14 w-full shrink-0 items-center justify-between border-t pl-5 pr-3">
              {user?.name ?? 'Unknown'}
              <div className="flex items-center gap-1 ">
                <form
                  action={async () => {
                    'use server'

                    await signOut()
                  }}
                >
                  <Button variant="ghost" size="icon" type="submit">
                    <ArrowLeftEndOnRectangleIcon className="size-5" />
                  </Button>
                </form>
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <main className="relative flex size-full grow">{children}</main>
        </div>
      </div>
    </div>
  )
}
