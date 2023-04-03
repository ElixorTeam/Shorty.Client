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
    <button type="button" onClick={changeTheme}>
      {theme === 'dark' ? (
        <MoonIcon className="h-5 w-5 transition hover:scale-105 active:scale-95 dark:text-white" />
      ) : (
        <SunIcon className="h-5 w-5 transition hover:scale-105 active:scale-95 dark:text-white" />
      )}
    </button>
  )
}
