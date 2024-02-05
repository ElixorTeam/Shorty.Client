import { ReactNode } from 'react'

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex h-full w-full">
      <div className="mx-auto h-fit w-full max-w-[120rem] grow">
        <main className="relative flex h-full w-full grow">{children}</main>
      </div>
    </div>
  )
}
