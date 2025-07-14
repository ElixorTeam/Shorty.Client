import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@repo/ui/sidebar'
import { SquarePenIcon } from 'lucide-react'
import Link from 'next/link'

import ROUTES from '@/shared/routes'

import SearchLink from './search-link'

export default function SidebarActions() {
  return (
    <SidebarGroup className="py-0">
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href={ROUTES.CREATE}>
                <SquarePenIcon className="size-4" />
                <span>New link</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SearchLink />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
