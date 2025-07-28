'use client'

import { BreadcrumbItem } from '@repo/ui/breadcrumb'
import { cn } from '@repo/ui/lib/utils'

import { rqClient } from '@/shared/api'

export function LinkBreadcrumb({
  linkUid,
  className,
  ...props
}: { linkUid: string } & React.ComponentProps<typeof BreadcrumbItem>) {
  const { data } = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: linkUid } },
  })
  return (
    <BreadcrumbItem className={cn('truncate', className)} {...props}>
      {data?.data.title}
    </BreadcrumbItem>
  )
}
