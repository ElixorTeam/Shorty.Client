'use client'

import { BreadcrumbItem } from '@repo/ui/breadcrumb'

import { rqClient } from '@/shared/api/instance'

export default function LinkBreadcrumb({
  linkUid,
}: Readonly<{ linkUid: string }>) {
  const { data } = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: linkUid } },
  })

  if (!data?.data) return null

  return <BreadcrumbItem className="truncate">{data.data.title}</BreadcrumbItem>
}
