import { ReactNode } from 'react'

import AuthProvider from '@/components/AuthProvider'
import SearchProvider from '@/components/SearchProvider'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <SearchProvider>
      <AuthProvider>
        <div className="relative flex h-full w-full ">
          <div className="mx-auto h-fit w-full max-w-[2150px] grow">
            <main className="relative flex h-full w-full grow">{children}</main>
          </div>
        </div>
      </AuthProvider>
    </SearchProvider>
  )
}
