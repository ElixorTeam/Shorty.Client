'use client'

import { SidebarMenuButton, useSidebar } from '@repo/ui/sidebar'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { LinkAvatar } from '@/entities/link'
import { ROUTES } from '@/shared/consts/routes'

export function LinkNavigationItem({
  link,
  ...props
}: {
  link: {
    uid: string
    title: string
    urls: URL[]
  }
} & React.ComponentProps<typeof SidebarMenuButton>) {
  const { uid: currentPathUid } = useParams<{ uid: string }>()
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenuButton
      onClick={() => {
        setOpenMobile(false)
      }}
      asChild
      isActive={currentPathUid === link.uid}
      {...props}
    >
      <Link href={ROUTES.LINK_DETAIL(link.uid)}>
        <LinkAvatar link={link} className="mx-0.5 size-4 shrink-0" />
        <span>{link.title}</span>
      </Link>
    </SidebarMenuButton>
  )
}
