import { BreadcrumbItem, BreadcrumbLink } from '@repo/ui/breadcrumb'
import { Button } from '@repo/ui/button'
import { LinkIcon } from 'lucide-react'
import Link from 'next/link'

import { ThemeSwitch } from '@/features/theme-switch'
import { ROUTES } from '@/shared/consts/routes'
import { NavigationHeader } from '@/widgets/app-layout'

export function EmptyAdminPage() {
  return (
    <>
      <NavigationHeader>
        <BreadcrumbItem>
          <BreadcrumbLink>Admin</BreadcrumbLink>
        </BreadcrumbItem>
      </NavigationHeader>
      <div className="flex size-full grow flex-col items-center justify-center">
        <div className="bg-background flex flex-col gap-2 rounded-lg border p-4 shadow">
          <h2 className="text-center text-sm">App theme</h2>
          <ThemeSwitch />
          <h2 className="mt-2 text-center text-sm">Don't you want to back?</h2>
          <Button
            variant="outline"
            size="sm"
            className="h-8 font-normal"
            asChild
          >
            <Link href={ROUTES.LINKS}>
              <LinkIcon className="mr-0.5 size-3.5" />
              <span>Back to links</span>
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
