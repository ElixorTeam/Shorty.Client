import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown-menu'
import Link from 'next/link'

import { auth, signOut } from '@/shared/auth'

export default async function AvatarDropdown() {
  const session = await auth()
  const user = session?.user
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage src={user?.image ?? ''} alt="user-avatar" />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user && user.roles.includes('admin') && (
          <DropdownMenuItem asChild>
            <Link href="/admin">Admin</Link>
          </DropdownMenuItem>
        )}
        <form
          action={async () => {
            'use server'

            await signOut()
          }}
        >
          <DropdownMenuItem asChild>
            <button
              type="submit"
              className="focus:bg-accent focus:text-accent-foreground relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              Sign out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
