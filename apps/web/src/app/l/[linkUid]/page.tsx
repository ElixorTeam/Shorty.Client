import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@repo/ui/breadcrumb'
import { Separator } from '@repo/ui/separator'
import { SidebarTrigger } from '@repo/ui/sidebar'
import Link from 'next/link'

import Dashboard from '@/pages-flat/main/dashboard'
import LinkBreadcrumb from '@/pages-flat/main/link-breadcrumb'
import ROUTES from '@/shared/routes'

export default async function Page({
  params,
}: {
  params: Promise<{ linkUid: string }>
}) {
  const { linkUid } = await params
  return (
    <>
      <header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={ROUTES.LINKS}>Links</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <LinkBreadcrumb linkUid={linkUid} />
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <Dashboard linkUid={linkUid} />
    </>
  )
}
