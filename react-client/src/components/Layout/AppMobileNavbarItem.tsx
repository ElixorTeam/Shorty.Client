'use client'

import Link from 'next-intl/link'
import { usePathname } from 'next-intl/client'
import { ReactNode } from 'react'
import clsx from 'clsx'

export default function AppMobileNavbarItem({
  link,
  children,
}: {
  link: string
  children: ReactNode
}) {
  const pathname = usePathname()
  return (
    <Link
      href={link}
      className={clsx(
        pathname === link ? 'text-sky-400' : 'text-gray-600',
        'transition ease-linear'
      )}
    >
      {children}
    </Link>
  )
}
