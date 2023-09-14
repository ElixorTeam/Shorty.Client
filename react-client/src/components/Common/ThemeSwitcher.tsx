'use client'

import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  const changeTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')
  useEffect(() => setMounted(true), [])

  if (!mounted)
    return (
      <SunIcon className="mx-3 h-5 w-5 group-hover:scale-105 group-active:scale-95 dark:text-white" />
    )

  return (
    <button
      type="button"
      onClick={changeTheme}
      className="group flex h-full w-10 items-center justify-center transition-transform dark:text-white"
    >
      {theme === 'dark' ? (
        <MoonIcon className="h-5 w-5 group-hover:scale-105 group-active:scale-95" />
      ) : (
        <SunIcon className="h-5 w-5 group-hover:scale-105 group-active:scale-95" />
      )}
    </button>
  )
}
