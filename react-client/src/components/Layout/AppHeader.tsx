// import { BellIcon } from '@heroicons/react/24/solid'
import { Link } from 'next-intl'
import LanguageSwitcher from '@/components/Common/LocaleSwitcher'
import ThemeSwitcher from '@/components/Common/ThemeSwitcher'

function LayoutHeader() {
  return (
    <header className="sticky top-0 z-50 flex px-5 ring-gray-200 md:px-[62px]">
      <div className="flex h-16 w-full items-center justify-between">
        <div className="flex flex-row items-center space-x-[60px]">
          <Link
            className="text-2xl font-extrabold dark:text-white"
            href="/links"
          >
            <p>Shorty</p>
          </Link>
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
