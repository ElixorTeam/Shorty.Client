import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Link from 'next-intl/link'

import ThemeSwitcher from '@/components/Common/ThemeSwitcher'
import Dashboard from '@/components/Dashboard'
import DetailsPanel from '@/components/DetailsPanel'
import ProfileButton from '@/components/ProfileButton'
import LinkSelector from '@/components/Selectors/LinkSelector'

export default function AppPage({
  searchParams,
}: {
  searchParams: { [_: string]: string | string[] | undefined }
}) {
  const { linkUID } = searchParams
  const isAnySelectedLink = !!linkUID
  return (
    <div className="h-full w-full grid-cols-[18rem,1fr] grid-rows-1 divide-x dark:divide-white/[.15] dark:border-x-white/[.15] sm:grid min-[1930px]:border-x">
      <div className="sticky top-0 flex h-screen w-full grow flex-col overflow-hidden bg-white dark:bg-black">
        <div className="flex h-[63px] w-full shrink-0 items-center justify-center text-center">
          <a href="/">
            <p className="text-3xl font-extrabold">
              Sho<span className="tracking-wide">r</span>
              <span className="tracking-wider">t</span>y
            </p>
          </a>
        </div>
        <LinkSelector />
        <div className="flex w-full items-center justify-center gap-2 py-2">
          <ProfileButton />
          <ThemeSwitcher />
        </div>
      </div>
      {/* eslint-disable tailwindcss/migration-from-tailwind-2 */}
      <div
        className={clsx(
          isAnySelectedLink ? 'absolute top-0' : 'hidden',
          'z-20 w-full overflow-clip bg-gray-50 dark:bg-neutral-950 sm:relative sm:flex sm:flex-col sm:bg-transparent dark:sm:bg-transparent'
        )}
      >
        {isAnySelectedLink ? (
          <>
            <div className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center gap-4 border-b border-b-black/[.1] bg-white/[.5] px-6 backdrop-blur dark:border-b-white/[.15] dark:bg-black/[.3]">
              <Link href="/app">
                <ArrowLeftIcon className="mt-[2px] h-5 w-5" />
              </Link>
              <p className="text-2xl">Project</p>
            </div>
            <div className="flex h-full w-full flex-col-reverse lg:grid lg:flex-none lg:grid-cols-[1fr,18rem] lg:grid-rows-1 lg:divide-x lg:bg-slate-50 lg:dark:divide-white/[.15] lg:dark:bg-black">
              <Dashboard />
              <div className="mb-10 h-fit w-full px-4 dark:bg-black lg:mb-0 lg:h-full lg:bg-white">
                <DetailsPanel />
              </div>
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <div className="w-full max-w-xs px-2">
              <p className="text-center leading-relaxed">
                Please select a link. If you don’t have any, then click on{' '}
                <span className="inline-block overflow-hidden rounded-lg border border-black/[.1] bg-gray-200 px-2 py-1 align-middle dark:border-white/[.15] dark:bg-neutral-800">
                  <p className="text-xs">New</p>
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
