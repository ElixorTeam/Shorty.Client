import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown-menu'
import { SidebarMenuButton } from '@repo/ui/sidebar'
import { Skeleton } from '@repo/ui/skeleton'
import { EllipsisVerticalIcon, LogOutIcon, ShieldIcon } from 'lucide-react'
import Link from 'next/link'

import { auth, signOut } from '@/shared/auth'
import { ROUTES } from '@/shared/consts/routes'

export async function SidebarUser() {
  const session = await auth()
  const user = session?.user

  if (!user) return <Skeleton className="h-16 w-full" />

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <Avatar className="size-8 rounded-lg">
            <AvatarImage src={user.image ?? ''} alt="user-avatar" />
            <AvatarFallback className="rounded-lg">
              {user.name?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">{user.name}</span>
            <span className="text-muted-foreground truncate text-xs">
              {user.email}
            </span>
          </div>
          <EllipsisVerticalIcon className="ml-auto size-4" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
        align="end"
        sideOffset={4}
      >
        {user.roles.includes('admin') && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href={ROUTES.ADMIN}>
                  <ShieldIcon />
                  Admin
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <form
          action={async () => {
            'use server'
            await signOut()
          }}
        >
          <DropdownMenuItem asChild>
            <button type="submit" className="w-full">
              <LogOutIcon />
              Log out
            </button>
          </DropdownMenuItem>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
