'use client'

import { cn } from '@repo/ui/lib/utils'
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from '@repo/ui/sidebar'
import { useMemo } from 'react'

import { useGetLinks } from '@/entities/link'

import { LinkNavigationItem } from './link-navigation-item'

export function LinkNavigation({
  className,
  ...props
}: React.ComponentProps<typeof SidebarGroup>) {
  const { data: links } = useGetLinks()

  const sortedLinks = useMemo(() => {
    if (!links) return null
    return [...links].sort(
      (a, b) => b.createDt.getTime() - a.createDt.getTime()
    )
  }, [links])

  return (
    <SidebarGroup
      className={cn('pt-0 group-data-[collapsible=icon]:hidden', className)}
      {...props}
    >
      {!(links && links.length == 0) && (
        <SidebarGroupLabel>Links</SidebarGroupLabel>
      )}
      <SidebarGroupContent>
        {!links ? (
          <SidebarMenu className="gap-px">
            {Array.from({ length: 5 }).map((_, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuSkeleton showIcon />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        ) : (
          <SidebarMenu className="gap-px">
            {sortedLinks?.map((link) => (
              <SidebarMenuItem key={link.uid}>
                <LinkNavigationItem link={link} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
