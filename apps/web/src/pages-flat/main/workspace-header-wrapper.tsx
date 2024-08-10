import { ReactNode } from 'react'

export default function WorkspaceHeaderWrapper({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="sticky top-0 z-20 h-14 w-full shrink-0 gap-4 border-b bg-background/[.95] px-6 backdrop-blur supports-[backdrop-filter]:bg-background/[.6]">
      {children}
    </div>
  )
}
