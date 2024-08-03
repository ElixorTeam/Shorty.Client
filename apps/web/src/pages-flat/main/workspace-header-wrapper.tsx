import { ReactNode } from 'react'

export default function WorkspaceHeaderWrapper({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="bg-background/[.95] supports-[backdrop-filter]:bg-background/[.6] sticky top-0 z-20 h-14 w-full shrink-0 gap-4 border-b px-6 backdrop-blur">
      {children}
    </div>
  )
}
