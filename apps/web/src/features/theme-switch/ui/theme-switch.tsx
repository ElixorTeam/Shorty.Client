'use client'

import { Skeleton } from '@repo/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/tabs'
import { LaptopIcon, MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

export function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  return (
    <>
      {!theme ? (
        <Skeleton className="h-9 w-64" />
      ) : (
        <Tabs value={theme} onValueChange={setTheme}>
          <TabsList className="bg-secondary dark:bg-sidebar/80 h-8 w-64">
            <TabsTrigger value="light" className="w-1/3 text-xs">
              <SunIcon className="size-3.5" />
              Light
            </TabsTrigger>
            <TabsTrigger value="dark" className="w-1/3 text-xs">
              <MoonIcon className="size-3.5" />
              Dark
            </TabsTrigger>
            <TabsTrigger value="system" className="w-1/3 text-xs">
              <LaptopIcon className="size-3.5" />
              System
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
    </>
  )
}
