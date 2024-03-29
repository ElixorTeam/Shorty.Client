'use client'

import Link from 'next-intl/link'
import { usePathname } from 'next-intl/client'

export default function NavbarItem({
  link,
  children
}: {
  link: string
  children: React.ReactNode
}) {
  const pathname = usePathname()
  return (
    <Link
      href={link}
      className={`${
        pathname === link ? 'text-sky-400' : 'text-gray-400'
      } w-full`}
    >
      <li className="flex w-full flex-row items-center justify-center gap-3 lg:justify-normal">
        {children}
      </li>
    </Link>
  )
}
