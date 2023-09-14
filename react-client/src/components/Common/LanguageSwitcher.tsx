'use client'

import { ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/solid'
import { usePathname } from 'next-intl/client'
import Link from 'next-intl/link'
import { useState } from 'react'

import DropdownMenu from '@/components/Common/DropdownMenu'
import languageOptions from '@/shared/languageOptions'

export default function LanguageSwitcher() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const currentPath = usePathname()
  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsDropdownOpen(true)}
    >
      <div>
        <button
          type="button"
          onClick={() => setIsDropdownOpen(true)}
          className="mx-auto flex h-10 w-16 items-center justify-center transition hover:scale-105 active:scale-95 dark:text-white"
        >
          <LanguageIcon className="h-5 w-5" />
          <ChevronDownIcon className="h-3 w-3" />
        </button>
      </div>
      <DropdownMenu
        isOpen={isDropdownOpen}
        setIsOpen={(statue) => setIsDropdownOpen(statue)}
      >
        <ul>
          {languageOptions.map((option) => (
            <Link href={currentPath} locale={option.value} key={option.value}>
              <li>
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-black/[.02]
                 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[.05]"
                >
                  {option.label}
                </button>
              </li>
            </Link>
          ))}
        </ul>
      </DropdownMenu>
    </div>
  )
}
