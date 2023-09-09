'use client'

import clsx from 'clsx'
import { usePathname } from 'next-intl/client'
import Link from 'next-intl/link'
import { ReactNode } from 'react'

export default function NavbarItem({
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
        pathname === link ? 'text-sky-400' : 'text-gray-400',
        'w-full'
      )}
    >
      <li className="flex w-full flex-row items-center justify-center gap-3 lg:justify-normal">
        {children}
      </li>
    </Link>
  )
}
