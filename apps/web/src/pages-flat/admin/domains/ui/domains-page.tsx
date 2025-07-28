import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@repo/ui/breadcrumb'
import Link from 'next/link'

import { ROUTES } from '@/shared/consts/routes'
import { NavigationHeader } from '@/widgets/app-layout'

import { CreateDomainDialog } from './create-domain-dialog'
import { DomainsTable } from './domains-table'

export async function DomainsPage() {
  return (
    <>
      <NavigationHeader>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ROUTES.ADMIN}>Admin</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Domains</BreadcrumbItem>
      </NavigationHeader>
      <div className="size-full p-4">
        <div className="mb-2 flex items-center gap-3 pb-1">
          <h2 className="font-[system-ui] text-xl font-stretch-ultra-expanded">
            Domains
          </h2>
          <CreateDomainDialog />
        </div>
        <DomainsTable />
      </div>
    </>
  )
}
