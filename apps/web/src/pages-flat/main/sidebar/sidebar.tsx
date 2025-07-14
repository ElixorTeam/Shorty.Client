import { Sidebar as Sb, SidebarContent, SidebarFooter } from '@repo/ui/sidebar'

import SidebarActions from './sidebar-actions'
import SidebarHeader from './sidebar-header'
import SidebarNavigation from './sidebar-navigation'
import SidebarUser from './sidebar-user'

export default function Sidebar() {
  return (
    <Sb collapsible="icon">
      <SidebarHeader />
      <SidebarContent>
        <SidebarActions />
        <SidebarNavigation />
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sb>
  )
}
