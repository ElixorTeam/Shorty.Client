'use client'

import { Button } from '@repo/ui/button'
import { Card, CardContent } from '@repo/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { Skeleton } from '@repo/ui/skeleton'
import { CalendarIcon, KeyIcon, LinkIcon, PlusIcon } from 'lucide-react'
import Link from 'next/link'

import { useGetLink, useGetLinkUrl } from '@/entities/link'
import { UrlAvatar } from '@/entities/link'

export function DescriptionCard({ linkUid }: Readonly<{ linkUid: string }>) {
  const { url } = useGetLinkUrl(linkUid)
  const { data: link } = useGetLink(linkUid)
  return (
    <Card className="bg-secondary py-4">
      <CardContent className="grid gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
        <div className="flex flex-col">
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <LinkIcon className="size-3" />
            Short URL
          </div>
          {!url ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <Link href={url}>{url.toString()}</Link>
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <CalendarIcon className="size-3" />
            Create at
          </div>
          {!link ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <span>{link.createDt.toLocaleDateString()}</span>
          )}
        </div>
        <div className="flex flex-col">
          <div className="text-muted-foreground flex items-center gap-1 text-sm">
            <LinkIcon className="size-3" />
            URLs
          </div>
          {!link?.urls[0] ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <div className="flex items-center gap-1.5 overflow-hidden">
              <Link
                href={link.urls[0]}
                className="flex items-center gap-1 truncate"
              >
                <UrlAvatar url={link.urls[0]} className="size-4" />
                {link.urls[0].hostname}
              </Link>
              {link.urls.length > 1 ? (
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
                      {link.urls.slice(1).map((url, index) => (
                        <li key={index} className="w-full">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="w-full justify-start"
                            asChild
                          >
                            <Link href={url}>
                              <UrlAvatar url={url} className="size-4" />
                              <span>{url.hostname}</span>
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
          {!link ? (
            <Skeleton className="h-6 w-32" />
          ) : (
            <span>{link.password ? 'Private' : 'Public'}</span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
