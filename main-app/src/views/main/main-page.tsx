import Link from 'next/link'

import { auth } from '@/auth'
import cn from '@/shared/lib/tailwind-merge'
import linkData from '@/views/main/test-link-data'
import WorkspaceHeader from '@/views/main/workspace-header'
import WorkspaceTabs from '@/views/main/workspace-tabs'
import Selector from '@/widgets/link-selector/link-selector'

export default async function MainPage({ linkUid }: { linkUid: string }) {
  const session = await auth()
  return (
    <div className="size-full grid-rows-1 divide-x dark:divide-zinc-800 dark:border-zinc-800 md:grid md:grid-cols-[18rem,1fr] lg:grid-cols-[24rem,1fr] min-[1930px]:border-x">
      <div className="sticky top-0 flex h-screen w-full grow flex-col overflow-hidden">
        <div className="flex h-14 w-full shrink-0 items-center justify-center border-b text-center dark:border-b-neutral-800">
          <Link href="/">
            <span className="text-3xl font-extrabold">
              Sho<span className="tracking-wide">r</span>
              <span className="tracking-wider">t</span>y
            </span>
          </Link>
        </div>
        <Selector links={linkData} />
      </div>
      <div
        className={cn(
          !linkUid ? 'absolute top-0' : 'hidden',
          'z-20 w-full overflow-clip bg-zinc-50 dark:bg-zinc-950 md:relative md:flex md:flex-col'
        )}
      >
        <div className="flex size-full flex-col">
          <WorkspaceHeader linkUID={linkUid} user={session?.user} />
          {!linkUid ? (
            <WorkspaceTabs />
          ) : (
            <div className="flex size-full flex-col items-center justify-center">
              <div className="w-full max-w-xs px-2">
                <p className="text-center leading-relaxed">
                  Please select a link. If you don’t have any, then click on{' '}
                  <span className="inline-flex items-center justify-center overflow-hidden rounded-md border bg-white px-2 py-1 align-middle dark:border-zinc-800 dark:bg-black">
                    <span className="text-xs">New</span>
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
