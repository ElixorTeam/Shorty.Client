import AppNavbar from '@/components/Layout/AppNavbar'
import AppHeader from '@/components/Layout/AppHeader'
import SearchProvider from '@/components/SearchProvider'
import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <div className="m-auto max-w-[1920px]">
        <AppHeader />
        <div className="grid h-[calc(100vh-64px)] grid-cols-[50px_1fr] overflow-hidden lg:grid-cols-[200px_1fr]">
          <div className="z-40">
            <AppNavbar />
          </div>
          <main className="bg-[#eef1f6] dark:bg-[#1c1a25]">{children}</main>
        </div>
      </div>
    </SearchProvider>
  )
}
