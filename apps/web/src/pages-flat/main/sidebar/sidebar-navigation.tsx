'use client'

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '@repo/ui/sidebar'

import { rqClient } from '@/shared/api/instance'

import SidebarLinkItem from './sidebar-link-item'

export default function SidebarNavigation() {
  const { data } = rqClient.useQuery('get', '/user/links')

  return (
    <SidebarGroup className="pt-0 group-data-[collapsible=icon]:hidden">
      {!(data?.data && data.data.length == 0) && (
        <SidebarGroupLabel>Links</SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        {!data?.data ? (
          <SidebarMenu className="gap-px">
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ) : (
          <SidebarMenu className="gap-px">
            {data.data.map((link) => (
              <SidebarMenuItem key={link.uid}>
                <SidebarLinkItem link={link} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
