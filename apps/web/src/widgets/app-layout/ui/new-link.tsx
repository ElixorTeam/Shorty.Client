'use client'

import { SidebarMenuButton, useSidebar } from '@repo/ui/sidebar'
import { SquarePenIcon } from 'lucide-react'
import Link from 'next/link'

import { ROUTES } from '@/shared/consts/routes'

export function NewLink() {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenuButton
      onClick={() => {
        setOpenMobile(false)
      }}
      asChild
    >
      <Link href={ROUTES.CREATE}>
        <SquarePenIcon className="size-4" />
        <span>New link</span>
      </Link>
    </SidebarMenuButton>
  )
}
