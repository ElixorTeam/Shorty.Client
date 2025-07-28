import React from 'react'

import { AdminSidebar } from '@/widgets/app-layout'

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdminSidebar />
      <main className="flex min-h-screen w-full flex-col">{children}</main>
    </>
  )
}
