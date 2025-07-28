'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@repo/ui/button'
import { Form, FormControl, FormField, FormItem } from '@repo/ui/form'
import { Input } from '@repo/ui/input'
import { Skeleton } from '@repo/ui/skeleton'
import { useQueryClient } from '@tanstack/react-query'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { LinkAvatar, useGetLink } from '@/entities/link'
import { type ApiSchemas, rqClient } from '@/shared/api'

import useUpdateLink from '../api/use-update-link'

const schema = z.object({
  title: z.string().min(4).max(32),
})

export function LinkTitle({ linkUid }: Readonly<{ linkUid: string }>) {
  const { data: link } = useGetLink(linkUid)
  const { update, isPending } = useUpdateLink()
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: link?.title ?? '' },
  })

  const saveTitle = async (values: { title: string }) => {
    if (isPending || !link) return

    const trimmedTitle = values.title.trim()
    if (!trimmedTitle || trimmedTitle === link.title) {
      setIsEditing(false)
      return
    }

    try {
      await update({
        uid: link.uid,
        title: trimmedTitle,
        password: link.password,
        isEnable: true,
        tags: [],
      })

      await queryClient.setQueryData(
        rqClient.queryOptions('get', '/user/links/{id}', {
          params: { path: { id: link.uid } },
        }).queryKey,
        (oldData: { data: ApiSchemas['Record'] } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            data: {
              ...oldData.data,
              title: trimmedTitle,
            },
          }
        }
      )

      await queryClient.setQueryData(
        rqClient.queryOptions('get', '/user/links').queryKey,
        (oldData: { data: ApiSchemas['Record'][] } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            data: oldData.data.map((item) =>
              item.uid === link.uid ? { ...item, title: trimmedTitle } : item
            ),
          }
        }
      )
    } catch (error) {
      console.log(error)
      toast('Failed to update title', {
        description: 'Please try again later.',
      })
    }

    setIsEditing(false)
  }

  if (!link) {
    return (
      <div className="flex items-center gap-2.5">
        <Skeleton className="mx-0.5 size-4.5 rounded-md" />
        <Skeleton className="h-7 w-32" />
      </div>
    )
  }

  return (
    <div className="flex w-full items-center gap-2.5 overflow-hidden">
      <LinkAvatar link={link} className="size-5" />
      {isEditing ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(saveTitle)}
            className="flex items-center"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      onBlur={form.handleSubmit(saveTitle)}
                      onKeyDown={(e) => {
                        if (e.key === 'Escape') {
                          setIsEditing(false)
                        }
                      }}
                      className="h-7 w-48"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      ) : (
        <div className="flex w-full items-center gap-2 overflow-hidden">
          <h1 className="text-medium text-left font-[system-ui] text-lg leading-5 font-stretch-ultra-expanded">
            {link.title}
          </h1>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-6"
            onClick={() => {
              form.reset({ title: link.title })
              setIsEditing(true)
            }}
          >
            <PencilIcon className="text-muted-foreground size-3.5" />
          </Button>
        </div>
      )}
    </div>
  )
}
