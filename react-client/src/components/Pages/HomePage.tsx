import Image from 'next/image'
import { useTranslations } from 'next-intl'
import cursor from '@/public/cursor.png'
import HomeMainButton from '@/components/Layout/HomeMainButton'
import AuthContainer from '@/components/Modals/AuthContainer'

export default function HomePage() {
  const t = useTranslations('home')
  return (
    <div className="flex h-full w-full items-center justify-center gap-y-10 md:px-20 lg:px-0">
      <div className="flex flex-col items-center space-y-10 md:flex-row-reverse md:justify-between">
        <div className="flex w-2/6 items-center md:block md:w-1/4">
          <div className="relative">
            <Image className="z-30 scale-125" src={cursor} alt="img" />
            <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-purple-400 opacity-40 blur-3xl" />
          </div>
        </div>
        <div className="z-10 flex w-[300px] flex-col items-center text-center sm:w-[370px] md:block md:text-left lg:w-[470px]">
          <p
            className="bg-gradient-to-r from-black to-gray-600 bg-clip-text pb-4 text-4xl font-bold
           text-transparent dark:from-white dark:to-indigo-300 sm:text-5xl lg:text-6xl"
          >
            {t('title')}
          </p>
          <p className="text-base font-light text-gray-600 dark:text-gray-400 sm:text-lg lg:text-2xl">
            {t('description')}
          </p>
          <div className="relative">
            <div
              className="absolute inset-0 mt-4 h-10 w-44 rounded-3xl bg-gradient-to-tr from-indigo-300 to-pink-300 opacity-90
               blur-md dark:opacity-30 md:h-14 md:w-64"
            />
            <HomeMainButton btnText={t('btnText')}>
              <AuthContainer authText={t('modalAuthTitle')} />
            </HomeMainButton>
          </div>
        </div>
      </div>
    </div>
  )
}
