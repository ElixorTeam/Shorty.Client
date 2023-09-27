import { ReactNode } from 'react'

import AuthProvider from '@/components/AuthProvider'
import SearchProvider from '@/components/SearchProvider'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <AuthProvider>
        <div className="relative flex h-full w-full flex-col overflow-hidden bg-cover 2xl:p-2">
          <div className="mx-auto grid h-full w-full max-w-screen-2xl grow grid-cols-[0rem,1fr] grid-rows-1 overflow-hidden 2xl:rounded-2xl 2xl:shadow-xl">
            <nav className="flex h-full w-full items-start gap-2 px-2 py-6">
              <ul className="mx-auto flex w-full flex-col items-center justify-center gap-4"></ul>
            </nav>
            <main className="flex h-full w-full grow">{children}</main>
          </div>
        </div>
      </AuthProvider>
    </SearchProvider>
  )
}
