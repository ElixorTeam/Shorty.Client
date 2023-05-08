// import { BellIcon } from '@heroicons/react/24/solid'
import { Link, useTranslations } from 'next-intl'
import LanguageSwitcher from '@/components/Common/LocaleSwitcher'
import ThemeSwitcher from '@/components/Common/ThemeSwitcher'
import LinkSearch from '@/components/LinksComponents/LinkSearch'

function LayoutHeader() {
  const t = useTranslations('app')
  return (
    <header className="sticky top-0 z-50 flex px-5 ring-gray-200 md:px-[50px] lg:px-[62px]">
      <div className="flex h-16 w-full items-center justify-between">
        <div className="flex flex-row items-center gap-[60px]">
          <Link
            className="text-2xl font-extrabold dark:text-white md:hidden lg:block"
            href="/links"
          >
            <p>Shorty</p>
          </Link>
          <LinkSearch searchText={t('headerSearch')} />
        </div>
        <div className="flex flex-row space-x-4">
          <li className="flex items-center">
            <ThemeSwitcher />
          </li>
          <li className="flex items-center">
            <LanguageSwitcher />
          </li>
          {/* <li className="flex items-center"> */}
          {/*  <BellIcon className="h-5 w-5 transition hover:scale-105 active:scale-95" /> */}
          {/* </li> */}
        </div>
      </div>
    </header>
  )
}

export default LayoutHeader
