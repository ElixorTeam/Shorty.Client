import React from 'react'

import { LinkSidebar } from '@/widgets/app-layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <LinkSidebar />
      <main className="flex min-h-screen w-full flex-col">{children}</main>
    </>
  )
}
