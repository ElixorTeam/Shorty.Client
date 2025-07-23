'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
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

import { rqClient } from '@/shared/api/instance'
import { ApiSchemas } from '@/shared/api/schema'

import { useLinkUidContext } from '../../models/link-uid-context'
import { useUpdateLink } from '../models/use-update-link'

const schema = z.object({
  title: z.string().min(1).max(100),
})

export default function LinkTitle() {
  const linkUid = useLinkUidContext()
  const { data } = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: linkUid } },
  })
  const { update, isPending } = useUpdateLink()
  const queryClient = useQueryClient()

  const [isEditing, setIsEditing] = useState(false)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { title: data?.data?.title ?? '' },
  })

  if (!data?.data) {
    return (
      <div className="flex items-center gap-2.5">
        <Skeleton className="mx-0.5 size-4.5 rounded-md" />
        <Skeleton className="h-7 w-32" />
      </div>
    )
  }

  const saveTitle = async (values: { title: string }) => {
    if (isPending) return

    const trimmedTitle = values.title.trim()
    if (!trimmedTitle || trimmedTitle === data.data.title) {
      setIsEditing(false)
      return
    }

    try {
      await update({
        uid: data.data.uid,
        title: trimmedTitle,
        password: data.data.password,
        isEnable: true,
        tags: [],
      })

      await queryClient.setQueryData(
        rqClient.queryOptions('get', '/user/links/{id}', {
          params: { path: { id: data.data.uid } },
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
            data: oldData.data.map((link) =>
              link.uid === data.data.uid
                ? { ...link, title: trimmedTitle }
                : link
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

  return (
    <div className="flex w-full items-center gap-2.5 overflow-hidden">
      <Avatar className="mx-0.5 size-4.5 rounded-none">
        <AvatarImage
          src={`http://www.google.com/s2/favicons?domain=${data.data.urls[0]}`}
          alt="avatar"
        />
        <AvatarFallback>{data.data.title || 'X'}</AvatarFallback>
      </Avatar>
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
          <h1 className="text-medium truncate text-left font-[system-ui] text-lg font-stretch-ultra-expanded">
            {data.data.title}
          </h1>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="size-6"
            onClick={() => {
              form.reset({ title: data.data.title })
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
