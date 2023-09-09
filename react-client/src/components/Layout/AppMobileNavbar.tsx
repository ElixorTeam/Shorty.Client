import { LinkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useTranslations } from 'next-intl'

import AppMobileNavbarItem from '@/components/Layout/AppMobileNavbarItem'
import LogOutDialog from '@/components/Modals/LogOutDialog'

export default function AppMobileNavbar() {
  const tAuth = useTranslations('auth')
  const translation = {
    modalLogOutTitle: tAuth('modalLogOutTitle'),
    modalLogOutDescription: tAuth('modalLogOutDescription'),
    modalLogOutOpenButton: tAuth('modalLogOutOpenButton'),
    modalLogOutCancelButton: tAuth('modalLogOutCancelButton'),
    modalLogOutAcceptButton: tAuth('modalLogOutAcceptButton'),
  }
  return (
    <div className="sticky bottom-0 z-40 h-12 w-full overflow-hidden px-4 py-1">
      <div className="h-full w-full rounded-xl bg-white text-neutral-600 shadow-2xl dark:bg-[#23212e]">
        <div className="flex h-full w-full items-center justify-center gap-10">
          <AppMobileNavbarItem link="/links">
            <LinkIcon className="h-7 w-7 p-[1px]" />
          </AppMobileNavbarItem>
          <AppMobileNavbarItem link="/create">
            <PlusCircleIcon className="h-7 w-7" />
          </AppMobileNavbarItem>
          <LogOutDialog translation={translation} />
        </div>
      </div>
    </div>
  )
}
