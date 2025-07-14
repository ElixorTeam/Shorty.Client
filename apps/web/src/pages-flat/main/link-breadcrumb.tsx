'use client'

import { BreadcrumbItem } from '@repo/ui/breadcrumb'

import { rqClient } from '@/shared/api/instance'

export default function LinkBreadcrumb({ linkUid }: { linkUid: string }) {
  const { data } = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: linkUid } },
  })

  if (!data?.data) return null

  return <BreadcrumbItem>{data.data.title}</BreadcrumbItem>
}
