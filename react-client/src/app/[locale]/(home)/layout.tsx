import HomeHeader from '@/components/Layout/HomeHeader'
import { ReactNode } from 'react'

export default function HomeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HomeHeader />
      <div className="mx-auto h-[calc(100vh-64px)] max-w-screen-xl">
        {children}
      </div>
    </>
  )
}
