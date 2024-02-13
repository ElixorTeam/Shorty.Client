'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

import LinkSettings from '@/components/link-settings'
import Overview from '@/components/overview'
import { Button } from '@/components/ui/button'

export default function AppWorkspace() {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="sticky top-14 z-20 flex h-10 w-full shrink-0 items-center justify-center border-b bg-zinc-50/[.6] backdrop-blur dark:border-b-zinc-800 dark:bg-zinc-950/[.6]">
        <TabsTrigger value="overview" asChild>
          <Button variant="link">Overview</Button>
        </TabsTrigger>
        <TabsTrigger value="settings" asChild>
          <Button variant="link">Settings</Button>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <Overview />
      </TabsContent>
      <TabsContent value="settings">
        <LinkSettings />
      </TabsContent>
    </Tabs>
  )
}
