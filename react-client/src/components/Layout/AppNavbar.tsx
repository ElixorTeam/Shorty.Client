import { LinkIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { Link, useTranslations } from 'next-intl'
import AppNavbarItem from './AppNavbarItem'

export default function LayoutNavbar() {
  const t = useTranslations('app')
  return (
    <div className="h-full">
      <nav className="mx-auto flex flex-col items-center lg:w-32">
        <Link href="/create">
          <button
            type="button"
            className="mb-10 mt-5 h-7 w-7 rounded-lg bg-blue-300 shadow-xl shadow-blue-200 dark:shadow-blue-200/[.1] lg:w-32 lg:rounded-xl"
          >
            <p className="hidden text-base text-white lg:block">
              {t('navbarCreate')}
            </p>
            <p className="block text-lg text-white lg:hidden">+</p>
          </button>
        </Link>
        <ul className="flex flex-col items-center space-y-6 text-base font-semibold text-black dark:text-white">
          <AppNavbarItem link="/links">
            <LinkIcon className="h-6 w-6" />
            <p className="hidden lg:block">{t('navbarLinks')}</p>
          </AppNavbarItem>
          <AppNavbarItem link="/">
            <Cog6ToothIcon className="h-6 w-6" />
            <p className="hidden lg:block">{t('navbarLogout')}</p>
          </AppNavbarItem>
        </ul>
      </nav>
    </div>
  )
}
