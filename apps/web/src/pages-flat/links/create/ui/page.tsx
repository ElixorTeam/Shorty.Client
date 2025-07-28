import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@repo/ui/breadcrumb'
import Link from 'next/link'

import { CreateLinkForm } from '@/features/link/create'
import { ROUTES } from '@/shared/consts/routes'
import { NavigationHeader } from '@/widgets/app-layout'

export function CreateLinkPage() {
  return (
    <>
      <NavigationHeader>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ROUTES.LINKS}>Links</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>Create</BreadcrumbItem>
      </NavigationHeader>
      <div className="mt-8 flex w-full justify-center px-6">
        <div className="w-full max-w-md">
          <div className="mb-4 w-full border-b pb-3">
            <h2 className="text-xl font-bold tracking-tight">Create link</h2>
            <p className="text-muted-foreground text-sm">
              Fill in the details to create a new link.
            </p>
          </div>
          <CreateLinkForm />
        </div>
      </div>
    </>
  )
}
