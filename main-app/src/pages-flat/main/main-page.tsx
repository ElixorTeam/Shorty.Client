import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query'

import NavigationHeader from '@/pages-flat/main/navigation-header'
import NoSelectedWarning from '@/pages-flat/main/no-selected-warning'
import linkData from '@/pages-flat/main/test-link-data'
import WorkspaceHeader from '@/pages-flat/main/workspace-header'
import WorkspaceTabs from '@/pages-flat/main/workspace-tabs'
import getRecords from '@/shared/api/get-records'
import { auth } from '@/shared/auth'
import cn from '@/shared/lib/tailwind-merge'
import Selector from '@/widgets/link-selector/link-selector'

export default async function MainPage({ linkUid }: { linkUid: string }) {
  const session = await auth()
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryFn: getRecords,
    queryKey: ['records'],
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
            'bg-background z-20 w-full overflow-clip md:relative md:flex md:flex-col'
          )}
        >
          <div className="flex size-full flex-col">
            <WorkspaceHeader linkUID={linkUid} user={session?.user} />
            {linkUid ? <WorkspaceTabs /> : <NoSelectedWarning />}
          </div>
        </div>
      </div>
    </HydrationBoundary>
  )
}
