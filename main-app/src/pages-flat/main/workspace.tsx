'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'

import { useGetCurrentRecord } from '@/entities/record'
import NoSelectedWarning from '@/pages-flat/main/no-selected-warning'
import { Button } from '@/shared/ui/button'
import Dashboard from '@/widgets/dashboard'
import Description from '@/widgets/description'
import UpdateLinkForm from '@/widgets/update-link-form'

export default function Workspace() {
  const { data, isError } = useGetCurrentRecord()
  return !data || isError ? (
    <NoSelectedWarning />
  ) : (
    <TabsPrimitive.Tabs defaultValue="overview">
      <TabsPrimitive.TabsList className="sticky top-14 z-20 flex h-10 w-full shrink-0 items-center justify-center border-b bg-background/[.95] backdrop-blur supports-[backdrop-filter]:bg-background/[.6]">
        <TabsPrimitive.TabsTrigger value="overview" asChild>
          <Button variant="link">Overview</Button>
        </TabsPrimitive.TabsTrigger>
        <TabsPrimitive.TabsTrigger value="edit" asChild>
          <Button variant="link">Edit</Button>
        </TabsPrimitive.TabsTrigger>
      </TabsPrimitive.TabsList>
      <TabsPrimitive.TabsContent value="overview">
        <div className="size-full grow space-y-4 p-8 pt-6">
          <Description record={data} />
          <Dashboard />
        </div>
      </TabsPrimitive.TabsContent>
      <TabsPrimitive.TabsContent value="edit">
        <UpdateLinkForm record={data} />
      </TabsPrimitive.TabsContent>
    </TabsPrimitive.Tabs>
  )
}
