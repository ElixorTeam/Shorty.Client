import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@repo/ui/breadcrumb'
import Link from 'next/link'

import { QrCodeCard, SocialShareCard } from '@/features/link/share'
import { ROUTES } from '@/shared/consts/routes'
import { NavigationHeader } from '@/widgets/app-layout'

import { AnalyticsCards } from './analytics-cards'
import { BlockTitle } from './block-title'
import { DeleteLinkWrapper } from './delete-link-wrapper'
import { DescriptionCard } from './description-card'
import { LinkBreadcrumb } from './link-breadcrumb'
import { LinkTitle } from './link-title'
import { ViewsChartCard } from './views-chart-card'

export function ViewLinkPage({ linkUid }: Readonly<{ linkUid: string }>) {
  return (
    <>
      <NavigationHeader>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={ROUTES.LINKS}>Links</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <LinkBreadcrumb linkUid={linkUid} />
      </NavigationHeader>
      <div className="@container/main flex flex-1 flex-col gap-4 py-4">
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card flex flex-col gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6">
          <div className="flex w-full justify-between">
            <LinkTitle linkUid={linkUid} />
            <DeleteLinkWrapper linkUid={linkUid} />
          </div>
          <DescriptionCard linkUid={linkUid} />
        </div>
        <BlockTitle>Sharing tools</BlockTitle>
        <div className="flex flex-col gap-4">
          <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-1 @4xl/main:grid-cols-2">
            <QrCodeCard linkUid={linkUid} />
            <SocialShareCard linkUid={linkUid} />
          </div>
        </div>
        <BlockTitle>Analytics</BlockTitle>
        <div className="flex flex-col gap-4">
          <AnalyticsCards linkUid={linkUid} />
          <div className="px-4 *:data-[slot=card]:shadow-xs lg:px-6">
            <ViewsChartCard linkUid={linkUid} />
          </div>
        </div>
      </div>
    </>
  )
}
