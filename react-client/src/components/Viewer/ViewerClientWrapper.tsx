'use client'

import { ReactNode } from 'react'
import { useAppSelector } from '@/redux/hooks'

export default function ViewerClientWrapper({
  children,
}: {
  children: ReactNode
}) {
  const selectedLink = useAppSelector((state) => state.selectedLink.selected)
  return (
    <div
      className={`${
        selectedLink ? 'block' : 'hidden md:block'
      } absolute left-0 top-0 z-[60] h-full w-screen overflow-y-auto sm:static sm:z-30 sm:h-full sm:w-full`}
    >
      {selectedLink && children}
    </div>
  )
}
