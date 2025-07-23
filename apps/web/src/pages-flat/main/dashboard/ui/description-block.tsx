'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { Skeleton } from '@repo/ui/skeleton'
import { CalendarIcon, KeyIcon, LinkIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { rqClient } from '@/shared/api/instance'

import { useLinkUidContext } from '../../models/link-uid-context'
import useGetShortLink from '../models/use-get-short-link'
import DeleteLinkAction from './delete-link-action'
import LinkTitle from './link-title'

export default function DescriptionBlock() {
  const linkUid = useLinkUidContext()
  const shortUrl = useGetShortLink({ linkUid })
  const { data } = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: linkUid } },
  })

  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card flex flex-col gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs lg:px-6">
      <div className="flex w-full justify-between">
        <LinkTitle />
        <DeleteLinkAction linkUid={linkUid} />
      </div>
      <Card>
        <CardContent className="grid gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
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
              <div className="flex items-center gap-1.5 overflow-hidden">
                <Link
                  href={data.data.urls.at(0)}
                  className="flex items-center gap-1 truncate"
                >
                  <Avatar className="mx-0.5 size-4.5 rounded-none">
                    <AvatarImage
                      src={`http://www.google.com/s2/favicons?domain=${data.data.urls.at(0)}`}
                      alt="avatar"
                    />
                    <AvatarFallback>
                      {new URL(data.data.urls.at(0)).hostname.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {new URL(data.data.urls.at(0)).hostname}
                </Link>
                {data.data.urls.length > 1 ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        size="icon"
                        variant="outline"
                        className="size-4.5 rounded-full"
                      >
                        <PlusIcon className="size-3" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-52 p-1">
                      <ul className="w-full">
                        {data.data.urls.slice(1).map((url, index) => (
                          <li key={index} className="w-full">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                              asChild
                            >
                              <Link href={url}>
                                <Avatar className="mx-0.5 size-4.5 rounded-none">
                                  <AvatarImage
                                    src={`http://www.google.com/s2/favicons?domain=${url}`}
                                    alt="avatar"
                                  />
                                  <AvatarFallback>
                                    {url.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span>{new URL(url).hostname}</span>
                              </Link>
                            </Button>
                          </li>
                        ))}
                      </ul>
                    </PopoverContent>
                  </Popover>
                ) : null}
              </div>
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
