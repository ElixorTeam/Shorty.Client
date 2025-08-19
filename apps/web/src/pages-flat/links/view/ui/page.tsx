import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@repo/ui/breadcrumb'
import {
  InlineTabs,
  InlineTabsList,
  InlineTabsTrigger,
} from '@repo/ui/inline-tabs'
import { TabsContent } from '@repo/ui/tabs'
import { ChartNoAxesColumnIcon, HammerIcon } from 'lucide-react'
import Link from 'next/link'

import { QrCodeCard, SocialShareCard } from '@/features/link/share'
import { ROUTES } from '@/shared/consts/routes'
import { NavigationHeader } from '@/widgets/app-layout'

import { DeleteLinkWrapper } from './delete-link-wrapper'
import { DescriptionCard } from './description-card'
import { DeviceBarChart } from './device-bar-chart'
import { LinkBreadcrumb } from './link-breadcrumb'
import { LinkTitle } from './link-title'
import { OsBarChart } from './os-bar-chart'
import { TodayViews } from './today-views'
import { UniqueRadialChart } from './unique-radial-chart'
import { ViewsChartCard } from './views-chart-card'

export function ViewLinkPage({ linkUid }: { linkUid: string }) {
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
      <div className="@container/main flex w-full flex-1 flex-col gap-4 pt-4">
        <div className="flex flex-col gap-4 px-4 lg:px-6">
          <div className="flex w-full justify-between">
            <LinkTitle linkUid={linkUid} />
            <DeleteLinkWrapper linkUid={linkUid} />
          </div>
          <DescriptionCard linkUid={linkUid} />
        </div>
        <InlineTabs defaultValue="dashboard">
          <InlineTabsList className="gap-4 border-b px-6">
            <InlineTabsTrigger value="dashboard">
              <ChartNoAxesColumnIcon className="size-3.5" />
              Dashboard
            </InlineTabsTrigger>
            <InlineTabsTrigger value="control">
              <HammerIcon className="size-3.5" />
              Control
            </InlineTabsTrigger>
          </InlineTabsList>
          <TabsContent value="dashboard">
            <div className="flex flex-col gap-4 py-4">
              <div className="*:data-[slot=card]:bg-card grid grid-cols-1 grid-rows-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-2 @4xl/main:grid-cols-4">
                <TodayViews linkUid={linkUid} />
                <UniqueRadialChart linkUid={linkUid} />
                <DeviceBarChart linkUid={linkUid} />
                <OsBarChart linkUid={linkUid} />
              </div>
              <div className="*:data-[slot=card]:bg-card px-4 *:data-[slot=card]:shadow-xs lg:px-6">
                <ViewsChartCard linkUid={linkUid} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="control" className="py-4">
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:shadow-xs lg:px-6 @xl/main:grid-cols-1 @4xl/main:grid-cols-2">
                <QrCodeCard linkUid={linkUid} />
                <SocialShareCard linkUid={linkUid} />
              </div>
            </div>
          </TabsContent>
        </InlineTabs>
      </div>
    </>
  )
}
