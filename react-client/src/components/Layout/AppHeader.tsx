// import { BellIcon } from '@heroicons/react/24/solid'
import Link from 'next-intl/link'
import LanguageSwitcher from '@/components/Common/LocaleSwitcher'
import ThemeSwitcher from '@/components/Common/ThemeSwitcher'

function LayoutHeader() {
  return (
    <header className="sticky top-0 z-50 flex px-5 ring-gray-200 sm:px-12 lg:px-[62px]">
      <div className="flex h-16 w-full items-center justify-between">
        <Link className="text-2xl font-extrabold dark:text-white" href="/links">
          <p>Shorty</p>
        </Link>
        <div className="flex flex-row gap-1">
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
