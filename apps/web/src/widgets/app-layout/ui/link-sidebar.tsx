import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@repo/ui/sidebar'

import { LinkNavigation } from './link-navigation'
import { NewLink } from './new-link'
import { SearchLinkWrapper } from './search-link-wrapper'
import { SidebarLogo } from './sidebar-logo'
import { SidebarUser } from './sidebar-user'

export function LinkSidebar() {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="py-0">
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <NewLink />
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SearchLinkWrapper />
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <LinkNavigation />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarUser />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
