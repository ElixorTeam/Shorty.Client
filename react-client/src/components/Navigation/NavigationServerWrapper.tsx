import { ReactNode } from 'react'

export default function NavigationServerWrapper({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div
      className="mx-4 flex h-fit max-h-[calc(100%_-_10px)] flex-col overflow-hidden rounded-2xl shadow-lg sm:mx-0
         sm:max-h-[calc(100%_-_20px)] sm:shadow-2xl"
    >
      {children}
    </div>
  )
}
