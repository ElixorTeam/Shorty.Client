import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'
import { z } from 'zod'

import { getDomains } from '@/entities/domain'
import { getAllRecords, getCurrentRecord } from '@/entities/record'
import cn from '@/shared/lib/tailwind-merge'
import Selector from '@/widgets/link-selector'

import NavigationHeader from './navigation-header'
import Workspace from './workspace'
import WorkspaceHeader from './workspace-header'


export default async function MainPage({ linkUid }: { linkUid: string }) {
  const isValidUid = z.string().uuid().safeParse(linkUid).success
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryFn: getAllRecords,
    queryKey: ['records'],
  })

  await queryClient.prefetchQuery({
    queryFn: getDomains,
    queryKey: ['domains'],
  })

  // TODO: execute if linkUid is valid
  await queryClient.prefetchQuery({
    queryFn: async () => getCurrentRecord(linkUid),
    queryKey: ['currentRecord', linkUid],
  })
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
            <WorkspaceHeader />
            <Workspace />
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}
