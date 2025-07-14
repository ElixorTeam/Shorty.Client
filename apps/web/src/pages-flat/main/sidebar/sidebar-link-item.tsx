'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { SidebarMenuButton } from '@repo/ui/sidebar'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ApiSchemas } from '@/shared/api/schema'
import ROUTES from '@/shared/routes'

export default function SidebarLinkItem({
  link,
}: Readonly<{
  link: ApiSchemas['Record']
}>) {
  const pathname = usePathname()
  const currentPathUid = pathname.split('/').pop()
  return (
    <SidebarMenuButton asChild isActive={currentPathUid === link.uid}>
      <Link href={`${ROUTES.LINKS}/${link.uid}`}>
        {link.urls.length === 1 ? (
          <Avatar className="mx-0.5 size-4 rounded-none">
            <AvatarImage
              src={`http://www.google.com/s2/favicons?domain=${link.urls[0] ?? ''}`}
              alt="avatar"
            />
            <AvatarFallback>{link.title[0]}</AvatarFallback>
          </Avatar>
        ) : (
          <div className="bg-secondary flex size-5 items-center justify-center overflow-hidden rounded-full">
            <span className="text-xs">{link.urls.length}</span>
          </div>
        )}
        <span>{link.title}</span>
      </Link>
    </SidebarMenuButton>
  )
}
