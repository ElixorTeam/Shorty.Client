'use client'

import { useState, useRef, useEffect } from 'react'
import { LanguageIcon, ChevronDownIcon } from '@heroicons/react/24/solid'
import { Link } from 'next-intl'
import { usePathname } from 'next/navigation'

type LanguageOption = {
  label: string
  value: string
}

const languageOptions: LanguageOption[] = [
  { label: 'English', value: 'en' },
  { label: 'Русский', value: 'ru' }
]

export default function LocaleSwitcher() {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 w-28 list-none rounded-md bg-white py-1 shadow-lg ring-1
               ring-black/[.10] backdrop-blur-md dark:bg-[#2a2633]/[.80] dark:ring-white/[.20]"
        >
          {languageOptions.map(option => (
            <Link href={pathName} locale={option.value} key={option.value}>
              <li>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="block w-full
                      px-4 py-2 text-left text-sm leading-5 text-gray-700 hover:bg-gray-50
                        hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[.05]"
                >
                  {option.label}
                </button>
              </li>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
