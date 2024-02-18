'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'

import Overview from '@/components/overview'
import { Button } from '@/shared/ui/button'
import UpdateLinkForm from '@/widgets/update-link-form'
import Description from '@/widgets/description/description'
import Dashboard from '@/widgets/dashboard/dashboard'

export default function WorkspaceTabs() {
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
        <div className="size-full grow space-y-4 p-8 pt-6">
          <Description />
          <Dashboard />
        </div>
      </TabsContent>
      <TabsContent value="settings">
        <UpdateLinkForm />
      </TabsContent>
    </Tabs>
  )
}
