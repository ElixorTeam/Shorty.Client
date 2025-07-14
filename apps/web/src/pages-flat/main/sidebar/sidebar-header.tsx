import { Button } from '@repo/ui/button'
import {
  SidebarHeader as SdHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@repo/ui/sidebar'
import Link from 'next/link'

import ROUTES from '@/shared/routes'

export default function SidebarHeader() {
  return (
    <SdHeader>
      <SidebarMenu>
        <SidebarMenuItem>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="flex shrink-0 items-center justify-start p-2 px-3 group-data-[collapsible=icon]:px-2"
          >
            <Link href={ROUTES.HOME}>
              <span className="font-stretch-ultra-expanded text-left font-[system-ui] text-base tracking-[0.07rem] group-data-[collapsible=icon]:hidden">
                shorty
              </span>
              <span className="font-stretch-ultra-expanded hidden pl-[2px] font-[system-ui] text-base tracking-[0.07rem] group-data-[collapsible=icon]:block">
                s
              </span>
            </Link>
          </Button>
        </SidebarMenuItem>
      </SidebarMenu>
    </SdHeader>
  )
}
