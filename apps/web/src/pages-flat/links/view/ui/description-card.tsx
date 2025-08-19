'use client'

import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '@repo/ui/popover'
import { Skeleton } from '@repo/ui/skeleton'
import {
  CalendarIcon,
  KeyIcon,
  LinkIcon,
  LockIcon,
  PlusIcon,
} from 'lucide-react'
import Link from 'next/link'

import { useGetLink, useGetLinkUrl } from '@/entities/link'
import { UrlAvatar } from '@/entities/link'

export function DescriptionCard({ linkUid }: { linkUid: string }) {
  const { url } = useGetLinkUrl(linkUid)
  const { data: link } = useGetLink(linkUid)
  return (
    <div className="grid flex-wrap gap-6 gap-y-2 sm:flex">
      <div>
        <div className="text-muted-foreground flex items-center gap-1 text-xs uppercase">
          <CalendarIcon className="size-2.5" />
          Create at
        </div>
        {!link ? (
          <Skeleton className="h-6 w-32" />
        ) : (
          <span>{link.createDt.toLocaleDateString()}</span>
        )}
      </div>
      <div>
        <div className="text-muted-foreground flex items-center gap-1 text-xs uppercase">
          <LinkIcon className="size-2.5" />
          Short url
        </div>
        {!url ? (
          <Skeleton className="h-6 w-40" />
        ) : (
          <Button
            variant="link"
            className="h-fit p-0 text-base font-normal"
            asChild
          >
            <Link href={url}>{url.toString()}</Link>
          </Button>
        )}
      </div>
      <div className="flex flex-col">
        <div className="text-muted-foreground flex items-center gap-1 text-xs uppercase">
          <LinkIcon className="size-2.5" />
          URLs
        </div>
        {!link?.urls[0] ? (
          <Skeleton className="h-6 w-32" />
        ) : (
          <div className="flex items-center gap-2 overflow-hidden">
            <Button
              variant="link"
              className="h-fit p-0 text-base font-normal"
              asChild
            >
              <Link href={link.urls[0]}>
                <UrlAvatar url={link.urls[0]} className="size-4" />
                {link.urls[0].hostname}
              </Link>
            </Button>
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
      <div>
        <div className="text-muted-foreground flex items-center gap-1 text-xs uppercase">
          Access
        </div>
        {!url ? (
          <Skeleton className="h-6 w-40" />
        ) : (
          <>
            {link?.password ? (
              <Badge>
                <LockIcon />
                Protected
              </Badge>
            ) : (
              <Badge variant="secondary">
                <KeyIcon />
                Public
              </Badge>
            )}
          </>
        )}
      </div>
    </div>
  )
}
