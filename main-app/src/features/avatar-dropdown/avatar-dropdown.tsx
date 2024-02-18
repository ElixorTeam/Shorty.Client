import { signOut } from '@/auth'
import { ExtendedUser } from '@/shared/types/next-auth'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'

export default async function AvatarDropdown({
  user,
}: {
  user?: ExtendedUser
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar className="size-8">
          <AvatarImage src={user?.image!} alt="user-avatar" />
          <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <form
          action={async () => {
            'use server'

            await signOut()
          }}
        >
          <DropdownMenuItem asChild>
            <button
              type="submit"
              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-zinc-100 focus:text-zinc-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 dark:focus:bg-zinc-800 dark:focus:text-zinc-50"
            >
              Sign out
            </button>
          </DropdownMenuItem>
        </form>
        {user?.role === 'admin' && <DropdownMenuItem>Admin</DropdownMenuItem>}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
