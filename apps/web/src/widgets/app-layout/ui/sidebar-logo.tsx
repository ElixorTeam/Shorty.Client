import { Button } from '@repo/ui/button'
import { SidebarMenu, SidebarMenuItem } from '@repo/ui/sidebar'
import Link from 'next/link'

import { ROUTES } from '@/shared/consts/routes'

export function SidebarLogo() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="flex shrink-0 items-center justify-start p-2 px-3 group-data-[collapsible=icon]:px-2"
        >
          <Link href={ROUTES.HOME}>
            <span className="text-left font-[system-ui] text-base tracking-[0.07rem] font-stretch-ultra-expanded group-data-[collapsible=icon]:hidden">
              shorty
            </span>
            <span className="hidden pl-[2px] font-[system-ui] text-base tracking-[0.07rem] font-stretch-ultra-expanded group-data-[collapsible=icon]:block">
              s
            </span>
          </Link>
        </Button>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
