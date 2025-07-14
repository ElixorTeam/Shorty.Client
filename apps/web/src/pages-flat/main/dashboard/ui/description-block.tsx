'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'
import { Skeleton } from '@repo/ui/skeleton'
import { useQueryClient } from '@tanstack/react-query'
import { CalendarIcon, KeyIcon, LinkIcon, TrashIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { rqClient } from '@/shared/api/instance'
import { ApiSchemas } from '@/shared/api/schema'
import ROUTES from '@/shared/routes'

import { useDeleteLink } from '../models/use-delete-link'
import useGetShortLink from '../models/use-get-short-link'

export default function DescriptionBlock({ linkUid }: { linkUid: string }) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const shortUrl = useGetShortLink({ linkUid })
  const { del, isPending: isPending } = useDeleteLink()
  const { data } = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: linkUid } },
  })

  const handleDelete = async () => {
    try {
      await del(linkUid)
      queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/user/links/{id}', {
          params: { path: { id: linkUid } },
        })
      )
      queryClient.setQueryData(
        rqClient.queryOptions('get', '/user/links').queryKey,
        (oldData: { data: ApiSchemas['Record'][] } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            data: oldData.data.filter((link) => link.uid !== linkUid),
          }
        }
      )
      router.push(ROUTES.LINKS)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card *:data-[slot=card]:shadow-xs flex flex-col gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t lg:px-6">
      <div className="flex w-full justify-between">
        <div className="flex items-center gap-2.5">
          {!data?.data ? (
            <Skeleton className="size-4.5 mx-0.5 rounded-md" />
          ) : (
            <Avatar className="size-4.5 mx-0.5 rounded-none">
              <AvatarImage
                src={`http://www.google.com/s2/favicons?domain=${data.data.urls[0]}`}
                alt="avatar"
              />
              <AvatarFallback>{data.data.title || 'X'}</AvatarFallback>
            </Avatar>
          )}
          {!data?.data ? (
            <Skeleton className="h-7 w-32" />
          ) : (
            <h1 className="text-medium font-stretch-ultra-expanded text-left font-[system-ui] text-lg">
              {data.data.title}
            </h1>
          )}
        </div>
        <Button
          size="sm"
          variant="secondary"
          onClick={handleDelete}
          disabled={isPending || !data?.data}
        >
          <TrashIcon />
          Delete
        </Button>
      </div>
      <Card>
        <CardContent className="@xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid gap-4">
          <div className="flex flex-col">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <LinkIcon className="size-3" />
              Short URL
            </div>
            {!shortUrl ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <Link href={shortUrl}>{shortUrl}</Link>
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <CalendarIcon className="size-3" />
              Create at
            </div>
            {!data?.data ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <span>{new Date(data.data.createDt).toLocaleDateString()}</span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <LinkIcon className="size-3" />
              URLs
            </div>
            {!data?.data ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <span>{data.data.urls.length}</span>
            )}
          </div>
          <div className="flex flex-col">
            <div className="text-muted-foreground flex items-center gap-1 text-sm">
              <KeyIcon className="size-3" />
              Type
            </div>
            {!data?.data ? (
              <Skeleton className="h-6 w-32" />
            ) : (
              <span>{data.data.password ? 'Private' : 'Public'}</span>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
