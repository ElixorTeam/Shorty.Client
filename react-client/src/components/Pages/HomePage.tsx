'use client'

import Image from 'next/image'
import { useTranslations } from 'next-intl'

import HomeMainButton from '@/components/Layout/HomeMainButton'
import AuthContainer from '@/components/Modals/AuthContainer'
import cursor1 from '@/public/cursor1.svg'

export default function HomePage() {
  // const t = useTranslations('home')
  return (
    <div className="h-full w-full">
      <div className="mx-auto flex h-[600px] w-full max-w-3xl grid-cols-2 flex-col-reverse items-center justify-center gap-10 px-1 md:flex-row md:gap-0 md:px-4 lg:max-w-screen-lg">
        <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 md:h-full md:w-3/5 md:max-w-md md:items-start md:gap-6 lg:gap-10">
          <p className="text-center text-3xl font-bold tracking-tighter text-zinc-700 dark:text-zinc-300 md:text-left md:text-5xl lg:text-6xl">
            Make a long link shorter
          </p>
          <p className="text-center text-zinc-500 md:text-left md:text-xl lg:text-2xl">
            Easily replace your ugly long links into beautiful shorter versions.
          </p>
          <button
            type="button"
            className="h-10 w-32 rounded-xl bg-blue-500 lg:h-12 lg:w-36"
          >
            <p className="font-bold text-white lg:text-xl">Open App</p>
          </button>
        </div>
        <div className="flex w-full max-w-[150px] md:h-full md:w-2/5 md:max-w-none">
          <Image
            src={cursor1}
            alt=""
            className="w-full object-contain px-5 contrast-50 md:px-10 md:pl-10 lg:pl-28"
          />
        </div>
      </div>
    </div>

    // <div className="flex h-full w-full items-center justify-center gap-y-10 md:px-20 lg:px-0">
    //   <div className="flex flex-col items-center space-y-10 md:flex-row-reverse md:justify-between">
    //     <div className="flex w-2/6 items-center md:block md:w-1/4">
    //       <div className="relative">
    //         <Image
    //           className="z-30 scale-125"
    //           src={cursor}
    //           alt="img"
    //           loading="lazy"
    //           placeholder="blur"
    //         />
    //         <div className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 bg-purple-400 opacity-40 blur-3xl" />
    //       </div>
    //     </div>
    //     <div className="z-10 flex w-[300px] flex-col items-center text-center sm:w-[370px] md:block md:text-left lg:w-[470px]">
    //       <p
    //         className="bg-gradient-to-r from-black to-gray-600 bg-clip-text pb-4 text-4xl font-bold
    //        text-transparent dark:from-white dark:to-indigo-300 sm:text-5xl lg:text-6xl"
    //       >
    //         {t('title')}
    //       </p>
    //       <p className="text-base font-light text-gray-600 dark:text-gray-400 sm:text-lg lg:text-2xl">
    //         {t('description')}
    //       </p>
    //       <div className="relative">
    //         <div
    //           className="absolute inset-0 mt-4 h-10 w-44 rounded-3xl bg-gradient-to-tr from-indigo-300 to-pink-300 opacity-90
    //            blur-md dark:opacity-30 md:h-14 md:w-64"
    //         />
    //         <HomeMainButton btnText={t('btnText')}>
    //           <AuthContainer authText={t('modalAuthTitle')} />
    //         </HomeMainButton>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  )
}
