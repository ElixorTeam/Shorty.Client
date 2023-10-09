import { ReactNode } from 'react'

import AuthProvider from '@/components/AuthProvider'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <div className="relative flex h-full w-full">
        <div className="mx-auto h-fit w-full max-w-[120rem] grow">
          <main className="relative flex h-full w-full grow">{children}</main>
        </div>
      </div>
    </AuthProvider>
  )
}
