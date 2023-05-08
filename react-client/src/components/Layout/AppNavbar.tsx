import { LinkIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline'
import { Link, useTranslations } from 'next-intl'
import { PlusSmallIcon } from '@heroicons/react/24/solid'
import AppNavbarItem from './AppNavbarItem'

export default function LayoutNavbar() {
  const t = useTranslations('app')
  return (
    <div className="h-full w-full">
      <nav className="mt-1 flex w-full flex-col items-center justify-center gap-4 font-semibold">
        <Link
          href="/create"
          className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-300 shadow-xl shadow-blue-200 dark:shadow-blue-200/[.1] lg:w-32 lg:rounded-xl"
        >
          <p className="hidden text-base text-white lg:block">
            {t('navbarCreate')}
          </p>
          <PlusSmallIcon className="block h-6 w-6 text-white lg:hidden" />
        </Link>
        <div className="flex flex-col justify-center gap-4">
          <AppNavbarItem link="/links">
            <LinkIcon className="h-6 w-6" />
            <p className="hidden lg:block">{t('navbarLinks')}</p>
          </AppNavbarItem>
          <AppNavbarItem link="/">
            <ArrowLeftOnRectangleIcon className="h-6 w-6" />
            <p className="hidden lg:block">{t('navbarLogout')}</p>
          </AppNavbarItem>
        </div>
      </nav>
    </div>
  )
}
