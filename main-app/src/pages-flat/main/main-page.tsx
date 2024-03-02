import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import NavigationHeader from '@/pages-flat/main/navigation-header'
import Workspace from '@/pages-flat/main/workspace'
import WorkspaceHeader from '@/pages-flat/main/workspace-header'
import getCurrentRecord from '@/shared/api/get-current-record'
import getDomains from '@/shared/api/get-domains'
import getRecords from '@/shared/api/get-records'
import cn from '@/shared/lib/tailwind-merge'
import Selector from '@/widgets/link-selector/link-selector'

export default async function MainPage({ linkUid }: { linkUid: string }) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryFn: getRecords,
    queryKey: ['records'],
  })

  await queryClient.prefetchQuery({
    queryFn: getDomains,
    queryKey: ['domains'],
  })

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
            linkUid ? 'absolute top-0' : 'hidden',
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
