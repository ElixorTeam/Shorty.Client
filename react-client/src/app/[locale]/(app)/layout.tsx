import AppNavbar from '@/components/Layout/AppNavbar'
import AppHeader from '@/components/Layout/AppHeader'
import SearchProvider from '@/components/SearchProvider'
import { ReactNode } from 'react'
import AppMobileNavbar from '@/components/Layout/AppMobileNavbar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full overflow-hidden bg-[#eef1f6] dark:bg-[#1c1a25]">
      <SearchProvider>
        <div className="m-auto h-full max-w-[1920px]">
          <AppHeader />
          <div className="h-[calc(100%_-_64px)] sm:grid sm:grid-cols-[50px_1fr] sm:grid-rows-1 lg:grid-cols-[200px_1fr]">
            <div className="hidden sm:block">
              <AppNavbar />
            </div>
            <main className="h-[calc(100%_-_48px)] bg-[#eef1f6] dark:bg-[#1c1a25] sm:h-full">
              {children}
            </main>
            <div className="sm:hidden">
              <AppMobileNavbar />
            </div>
          </div>
        </div>
      </SearchProvider>
    </div>
  )
}
