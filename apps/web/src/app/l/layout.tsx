import { ReactNode } from 'react'

import Sidebar from '@/pages-flat/main/sidebar'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Sidebar />
      <main className="flex min-h-screen w-full flex-col">{children}</main>
    </>
  )
}
