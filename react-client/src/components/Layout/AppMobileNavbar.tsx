import {
  ArrowLeftOnRectangleIcon,
  LinkIcon,
  PlusCircleIcon
} from '@heroicons/react/24/outline'
import AppMobileNavbarItem from '@/components/Layout/AppMobileNavbarItem'

export default function AppMobileNavbar() {
  return (
    <div className="sticky bottom-0 z-40 h-12 w-full overflow-hidden px-4 py-1">
      <div className="h-full w-full rounded-xl bg-white dark:bg-[#23212e] text-neutral-600 shadow-2xl">
        <div className="flex h-full w-full items-center justify-center gap-10">
          <AppMobileNavbarItem link="/links">
            <LinkIcon className="h-7 w-7 p-[1px]" />
          </AppMobileNavbarItem>
          <AppMobileNavbarItem link="/create">
            <PlusCircleIcon className="h-7 w-7" />
          </AppMobileNavbarItem>
          <AppMobileNavbarItem link="/">
            <ArrowLeftOnRectangleIcon className="h-7 w-7 p-[1px]" />
          </AppMobileNavbarItem>
        </div>
      </div>
    </div>
  )
}
