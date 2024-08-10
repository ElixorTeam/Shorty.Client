import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { Button } from '@repo/ui/button'
import { cn } from '@repo/ui/lib/utils'
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import Link from 'next/link'
import { z } from 'zod'

import { getAnalyticsByLink, PeriodsEnum } from '@/entities/analytics'
import { getClientDomains } from '@/entities/domain'
import { getAllRecords, getCurrentRecord } from '@/entities/record'
import { getAllTags } from '@/entities/tag'
import AvatarDropdown from '@/features/avatar-dropdown'
import ThemeToggle from '@/features/theme-toggle'
import Selector from '@/widgets/link-selector'

import NavigationHeader from './navigation-header'
import NoSelectedWarning from './no-selected-warning'
import Workspace from './workspace'
import WorkspaceHeaderWrapper from './workspace-header-wrapper'

export default async function MainPage({ linkUid }: { linkUid: string }) {
  const isValidUid = z.string().uuid().safeParse(linkUid).success
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryFn: getAllRecords,
    queryKey: ['records'],
  })

  await queryClient.prefetchQuery({
    queryFn: getClientDomains,
    queryKey: ['domains'],
  })

  await queryClient.prefetchQuery({
    queryFn: getAllTags,
    queryKey: ['tags'],
  })

  if (isValidUid) {
    await queryClient.prefetchQuery({
      queryFn: async () => getCurrentRecord(linkUid),
      queryKey: ['currentRecord', linkUid],
    })

    await queryClient.prefetchQuery({
      queryFn: async () => getAnalyticsByLink(linkUid, PeriodsEnum.Week),
      queryKey: ['analytics', linkUid, PeriodsEnum.Week],
    })
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="size-full grid-rows-1 divide-x md:grid md:grid-cols-[18rem,1fr] lg:grid-cols-[24rem,1fr] min-[1930px]:border-x">
        <div className="sticky top-0 flex h-screen w-full grow flex-col overflow-hidden">
          <NavigationHeader />
          <Selector />
        </div>
        <div
          className={cn(
            isValidUid ? 'absolute top-0' : 'hidden',
            'z-20 w-full overflow-clip bg-background md:relative md:flex md:flex-col'
          )}
        >
          <div className="flex size-full flex-col">
            <WorkspaceHeaderWrapper>
              <div
                className={cn(
                  'flex size-full items-center',
                  isValidUid ? 'justify-between' : 'justify-end'
                )}
              >
                {isValidUid && (
                  <Button size="sm" variant="ghost" asChild>
                    <Link href="/main">
                      <ArrowLeftIcon className="size-4" />
                    </Link>
                  </Button>
                )}
                <div className="flex items-center justify-end gap-2 overflow-hidden md:gap-4">
                  <ThemeToggle />
                  <AvatarDropdown />
                </div>
              </div>
            </WorkspaceHeaderWrapper>
            {isValidUid ? <Workspace /> : <NoSelectedWarning />}
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}
