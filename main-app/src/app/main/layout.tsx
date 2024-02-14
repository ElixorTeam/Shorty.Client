import { redirect } from 'next/navigation'
import { ReactNode } from 'react'

import { auth } from '@/auth'

export default async function Layout({ children }: { children: ReactNode }) {
  const session = await auth()
  if (!session || !session.user) redirect('/api/auth/signin')
  return (
    <div className="relative flex size-full">
      <div className="mx-auto h-fit w-full max-w-[120rem] grow">
        <main className="relative flex size-full grow">{children}</main>
      </div>
    </div>
  )
}
