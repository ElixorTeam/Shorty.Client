import { ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import Link from 'next-intl/link'
import LocaleSwitcher from '@/components/Common/LocaleSwitcher'
import ThemeSwitcher from '@/components/Common/ThemeSwitcher'

function HeaderItem({ children }: { children: ReactNode }) {
  return <li className="flex items-center">{children}</li>
}

export default function HomeHeader() {
  const t = useTranslations('home')

  return (
    <header className="sticky top-0 z-40 flex justify-center px-5">
      <div className="flex h-16 w-full max-w-screen-xl items-center justify-between">
        <Link href="/">
          <p className="text-2xl font-extrabold">Shorty</p>
        </Link>
        <nav className="flex flex-row items-center">
          <ul className="inline-flex items-center space-x-2 md:space-x-4">
            <HeaderItem>
              <ThemeSwitcher />
            </HeaderItem>
            <HeaderItem>
              <LocaleSwitcher />
            </HeaderItem>
            <HeaderItem>
              <Link href="/auth">{t('headerAuth')}</Link>
            </HeaderItem>
          </ul>
        </nav>
      </div>
    </header>
  )
}
