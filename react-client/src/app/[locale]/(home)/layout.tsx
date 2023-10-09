import { ReactNode } from 'react'

import Footer from '@/components/Footer'
import Header from '@/components/Header'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="mx-auto h-full w-full max-w-screen-xl grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
