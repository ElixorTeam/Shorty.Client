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

import {
  CreateLinkForm,
  FormProvider,
} from '@/pages-flat/main/create-link-form'
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
            <BreadcrumbSeparator />
            <BreadcrumbItem>Create</BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <div className="mt-8 flex w-full justify-center px-6">
        <div className="w-full max-w-md">
          <div className="mb-4 w-full border-b pb-3">
            <h2 className="text-xl font-bold tracking-tight">Create link</h2>
            <p className="text-muted-foreground text-sm">
              Fill in the details to create a new link.
            </p>
          </div>
          <FormProvider>
            <CreateLinkForm />
          </FormProvider>
        </div>
      </div>
    </>
  )
}
