'use client'

import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'
import { useTheme } from 'next-themes'

export default function ThemeSwitcher() {
  const [isMounted, setMounted] = useState<boolean>(false)
  const { theme, setTheme } = useTheme()
  const changeTheme = () => {
    if (theme === 'dark') setTheme('light')
    else setTheme('dark')
  }

  useEffect(() => setMounted(true), [])
  if (!isMounted) return null

  return (
    <button
      type="button"
      onClick={changeTheme}
      className="group flex h-full w-10 items-center justify-center transition-transform"
    >
      {theme === 'dark' ? (
        <MoonIcon className="h-5 w-5 group-hover:scale-105 group-active:scale-95 dark:text-white" />
      ) : (
        <SunIcon className="h-5 w-5 group-hover:scale-105 group-active:scale-95 dark:text-white" />
      )}
    </button>
  )
}
