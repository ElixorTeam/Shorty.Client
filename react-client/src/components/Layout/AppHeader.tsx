import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { BellIcon } from '@heroicons/react/24/solid'
import { Link, useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/Common/LocaleSwitcher'
import ThemeSwitcher from '@/components/Common/ThemeSwitcher'

function LayoutHeader() {
  const t = useTranslations('app')
  return (
    <header className="sticky top-0 z-50 flex px-5 shadow-[0px_6px_10px_0px_rgba(0,0,0,0.03)] ring-gray-200 dark:shadow-[0px_6px_10px_0px_rgba(0,0,0,0.1)] md:px-14">
      <div className="flex h-16 w-full items-center justify-between">
        <div className="flex flex-row items-center space-x-16">
          <Link
            className="text-2xl font-extrabold dark:text-white"
            href="links"
          >
            <p>Shorty</p>
          </Link>
          <div className="hidden h-8 w-[300px] items-center space-x-2 rounded-3xl bg-slate-100 px-4 pb-[1px] shadow-sm dark:bg-[#1f1e29] dark:shadow-md md:flex">
            <MagnifyingGlassIcon className="h-5 w-5 stroke-gray-400" />
            <input
              placeholder={t('headerSearch')}
              className="w-full bg-white/[.0] placeholder:text-base focus:outline-none"
            />
          </div>
        </div>
        <div className="flex flex-row space-x-4">
          <li className="flex items-center">
            <ThemeSwitcher />
          </li>
          <li className="flex items-center">
            <LanguageSwitcher />
          </li>
          <li className="flex items-center">
            <BellIcon className="h-5 w-5 transition hover:scale-105 active:scale-95" />
          </li>
        </div>
      </div>
    </header>
  )
}

export default LayoutHeader
