import { ReactNode } from 'react'

import HomeHeader from '@/components/Layout/HomeHeader'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HomeHeader />
      <div className="mx-auto h-[calc(100vh-64px)] w-full max-w-screen-xl">
        {children}
      </div>
    </>
  )
}
