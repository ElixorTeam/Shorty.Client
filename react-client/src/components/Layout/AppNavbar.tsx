import { LinkIcon } from '@heroicons/react/24/outline'
import { PlusSmallIcon } from '@heroicons/react/24/solid'
import { useTranslations } from 'next-intl'
import Link from 'next-intl/link'

import LogOutDialog from '@/components/Modals/LogOutDialog'

import AppNavbarItem from './AppNavbarItem'

export default function LayoutNavbar() {
  const tHome = useTranslations('app')
  const tAuth = useTranslations('auth')
  const translation = {
    modalLogOutTitle: tAuth('modalLogOutTitle'),
    modalLogOutDescription: tAuth('modalLogOutDescription'),
    modalLogOutOpenButton: tAuth('modalLogOutOpenButton'),
    modalLogOutCancelButton: tAuth('modalLogOutCancelButton'),
    modalLogOutAcceptButton: tAuth('modalLogOutAcceptButton'),
  }
  return (
    <div className="h-full w-full">
      <nav className="mt-1 flex w-full flex-col items-center justify-center gap-4 font-semibold">
        <Link
          href="/create"
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-300 shadow-xl shadow-blue-200 dark:shadow-blue-200/[.1] lg:w-32 lg:rounded-xl"
        >
          <p className="hidden text-base text-white lg:block">
            {tHome('navbarCreate')}
          </p>
          <PlusSmallIcon className="block h-6 w-6 text-white lg:hidden" />
        </Link>
        <div className="flex flex-col justify-center gap-4">
          <AppNavbarItem link="/links">
            <LinkIcon className="h-6 w-6" />
            <p className="hidden lg:block">{tHome('navbarLinks')}</p>
          </AppNavbarItem>
          <LogOutDialog translation={translation} />
        </div>
      </nav>
    </div>
  )
}
