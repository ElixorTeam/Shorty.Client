'use client'

import Link from 'next-intl/link'
import { usePathname } from 'next-intl/client'
import DropdownMenu from '@/components/Common/DropdownMenu'
import { useState } from 'react'
import { ChevronDownIcon, LanguageIcon } from '@heroicons/react/24/solid'

type LanguageOption = {
  label: string
  value: string
}

const languageOptions: LanguageOption[] = [
  { label: 'English', value: 'en' },
  { label: 'Русский', value: 'ru' },
]

export default function LocaleSwitcher() {
  const [isOpen, setIsOpen] = useState(false)
  const pathName = usePathname()
  return (
    <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="mx-auto flex h-10 w-16 items-center justify-center transition hover:scale-105 active:scale-95 dark:text-white"
        >
          <LanguageIcon className="h-5 w-5" />
          <ChevronDownIcon className="h-3 w-3" />
        </button>
      </div>
      <DropdownMenu isOpen={isOpen} setIsOpen={(statue) => setIsOpen(statue)}>
        {languageOptions.map((option) => (
          <Link href={pathName} locale={option.value} key={option.value}>
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
      </DropdownMenu>
    </div>
  )
}
