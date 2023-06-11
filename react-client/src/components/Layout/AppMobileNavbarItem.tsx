'use client'

import Link from 'next-intl/link'
import { usePathname } from 'next-intl/client'
import { ReactNode } from 'react'

export default function AppMobileNavbarItem({
  link,
  children
}: {
  link: string
  children: ReactNode
}) {
  const pathname = usePathname()
  return (
    <Link
      href={link}
      className={`${
        pathname === link ? 'text-sky-400' : 'text-gray-600'
      } transition ease-linear`}
    >
      {children}
    </Link>
  )
}
