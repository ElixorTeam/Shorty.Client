import ThemeSwitcher from '@/components/Common/ThemeSwitcher'
import Dashboard from '@/components/Dashboard'
import DetailsPanel from '@/components/DetailsPanel'
import LinkSelector from '@/components/LinkSelector'
import ProfileButton from '@/components/ProfileButton'

export default function AppPage() {
  return (
    <div className="h-full w-full grid-cols-[18rem,1fr] grid-rows-1 divide-x border-x dark:divide-white/[.2] dark:border-x-white/[.15] sm:grid">
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
      <div className="relative hidden w-full overflow-clip sm:flex sm:flex-col">
        <div className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center border-b border-b-black/[.1] bg-white/[.5] backdrop-blur dark:border-b-white/[.2] dark:bg-black/[.3]">
          <p className="ml-10 text-2xl">Project</p>
        </div>
        <div className="flex h-full w-full flex-col-reverse lg:grid lg:flex-none lg:grid-cols-[1fr,18rem] lg:grid-rows-1 lg:divide-x lg:bg-slate-50 lg:dark:divide-white/[.2] lg:dark:bg-black">
          <Dashboard />
          <div className="mb-10 h-fit w-full bg-white px-4 dark:bg-black lg:mb-0 lg:h-full">
            <DetailsPanel />
          </div>
        </div>
      </div>
    </div>
  )
}
