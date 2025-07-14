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
  const { data, isLoading } = rqClient.useQuery('get', '/user/links')

  if (isLoading) {
    return (
      <SidebarMenu className="gap-px">
        {Array.from({ length: 5 }).map((_, index) => (
          <SidebarMenuItem key={index}>
            <SidebarMenuSkeleton showIcon />
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    )
  }

  return (
    <SidebarGroup className="pt-0 group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Links</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu className="gap-px">
          {data?.data?.map((link) => (
            <SidebarMenuItem key={link.uid}>
              <SidebarLinkItem link={link} />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
