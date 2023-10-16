import { ReactNode } from 'react'

import HomeFooter from '@/components/Layout/HomeFooter'
import HoomHeader from '@/components/Layout/HomeHeader'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <HoomHeader />
      <main className="mx-auto h-full w-full max-w-screen-xl grow">
        {children}
      </main>
      <HomeFooter />
    </div>
  )
}
