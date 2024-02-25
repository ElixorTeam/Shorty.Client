import { signOut } from '@/shared/auth'
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
        {user && user.roles.includes('admin') && (
          <DropdownMenuItem>Admin</DropdownMenuItem>
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
              className="relative flex w-full cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            >
              Sign out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
