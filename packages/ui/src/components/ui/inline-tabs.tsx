'use client'

import * as TabsPrimitive from '@radix-ui/react-tabs'
import { cn } from '@repo/ui/lib/utils'
import * as React from 'react'

function InlineTabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn('flex flex-col gap-2', className)}
      {...props}
    />
  )
}

function InlineTabsList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn('flex', className)}
      {...props}
    />
  )
}

function InlineTabsTrigger({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        'text-muted-foreground data-[state=active]:text-primary data-[state=active]:border-primary inline-flex items-center justify-center gap-1 border-b border-b-transparent pb-2 transition-colors',
        className
      )}
      {...props}
    />
  )
}

function InlineTabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
}

export { InlineTabs, InlineTabsContent, InlineTabsList, InlineTabsTrigger }
