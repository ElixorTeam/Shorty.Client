import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from '@repo/ui/breadcrumb'
import { Separator } from '@repo/ui/separator'
import { SidebarTrigger } from '@repo/ui/sidebar'
import Link from 'next/link'

import WelcomeBlock from '@/pages-flat/main/welcome-block'
import ROUTES from '@/shared/routes'

export default async function Page() {
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
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="bg-sidebar flex size-full grow flex-col items-center justify-center">
        <WelcomeBlock />
      </div>
    </>
  )
}
