'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { Button } from '@repo/ui/button'
import { useEffect, useState } from 'react'

import { RecordType, useGetCurrentRecord } from '@/entities/record'
import UpdateLinkForm from '@/features/update-link-form'
import Dashboard from '@/widgets/dashboard'
import Description from '@/widgets/description'

import NoSelectedWarning from './no-selected-warning'

export default function Workspace() {
  const { data, isError } = useGetCurrentRecord()
  const [currentTab, setCurrentTab] = useState<string>('overview')
  const [prevData, setPrevData] = useState<RecordType | null>(null)

  useEffect(() => {
    if (!(data && prevData !== data)) return
    setCurrentTab('overview')
    setPrevData(data)
  }, [data, prevData])

  return !data || isError ? (
    <NoSelectedWarning />
  ) : (
    <TabsPrimitive.Tabs
      value={currentTab}
      onValueChange={(value) => {
        setCurrentTab(value)
      }}
    >
      <TabsPrimitive.TabsList className="bg-background/[.95] supports-[backdrop-filter]:bg-background/[.6] sticky top-14 z-20 flex h-10 w-full shrink-0 items-center justify-center border-b backdrop-blur">
        <TabsPrimitive.TabsTrigger value="overview" asChild>
          <Button variant="link">Overview</Button>
        </TabsPrimitive.TabsTrigger>
        <TabsPrimitive.TabsTrigger value="edit" asChild>
          <Button variant="link">Edit</Button>
        </TabsPrimitive.TabsTrigger>
      </TabsPrimitive.TabsList>
      <TabsPrimitive.TabsContent value="overview">
        <div className="size-full grow space-y-4 p-5 sm:p-8 sm:pt-6">
          <Description record={data} />
          <Dashboard />
        </div>
      </TabsPrimitive.TabsContent>
      <TabsPrimitive.TabsContent value="edit">
        <UpdateLinkForm
          record={data}
          onFormSubmit={() => {
            setCurrentTab('overview')
          }}
        />
      </TabsPrimitive.TabsContent>
    </TabsPrimitive.Tabs>
  )
}
