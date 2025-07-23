'use client'

import { Button } from '@repo/ui/button'
import { Skeleton } from '@repo/ui/skeleton'
import { Tabs, TabsList, TabsTrigger } from '@repo/ui/tabs'
import { LaptopIcon, MoonIcon, SquarePenIcon, SunIcon } from 'lucide-react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

import ROUTES from '@/shared/routes'

export default function WelcomeBlock() {
  const { theme, setTheme } = useTheme()

  return (
    <div className="bg-background flex flex-col gap-2 rounded-lg border p-4 shadow">
      <h2 className="text-center text-sm">App theme</h2>
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
      <h2 className="mt-2 text-center text-sm">Don't you have any link?</h2>
      <Button variant="outline" size="sm" className="h-8 font-normal" asChild>
        <Link href={ROUTES.CREATE}>
          <SquarePenIcon className="mr-0.5 size-3.5" />
          <span>Create new</span>
        </Link>
      </Button>
    </div>
  )
}
