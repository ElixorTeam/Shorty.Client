import { ReactNode } from 'react'

import AuthProvider from '@/components/AuthProvider'
import AppHeader from '@/components/Layout/AppHeader'
import AppMobileNavbar from '@/components/Layout/AppMobileNavbar'
import AppNavbar from '@/components/Layout/AppNavbar'
import SearchProvider from '@/components/SearchProvider'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <AuthProvider>
        <div className="h-full overflow-hidden">
          <div className="m-auto flex h-full max-w-[1920px] flex-col">
            <AppHeader />
            <div className="h-full sm:grid sm:grid-cols-[50px_1fr] sm:grid-rows-1 lg:grid-cols-[200px_1fr]">
              <div className="hidden sm:block">
                <AppNavbar />
              </div>
              <main className="flex h-[calc(100%_-_48px)] sm:h-full">
                {children}
              </main>
              <div className="sm:hidden">
                <AppMobileNavbar />
              </div>
            </div>
          </div>
        </div>
      </AuthProvider>
    </SearchProvider>
  )
}
