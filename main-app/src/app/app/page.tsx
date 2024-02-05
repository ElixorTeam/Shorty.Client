'use client'

import Selector from '@/components/link-selector/link-selector'
import { cn } from '@/lib/utils'
import { LinkRecordType } from '@/shared/link-record-type'
import {
  ArrowLeftIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import avatar_artyom from '@/public/avatar_artyom.jpg'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/theme-toggle'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Overview from '@/components/overview'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import LinkSettings from '@/components/link-settings'

const links: LinkRecordType[] = [
  {
    uid: '1',
    title: 'Youtube Channelfrfrfr',
    url: 'https://www.youtube.com/c/Ap73MKa',
    createDate: new Date(),
    tag: 'Youtube',
    imageURL: avatar_artyom.src,
  },
  {
    uid: '2',
    title: 'VK',
    url: 'https://www.vk.com',
    createDate: new Date(),
    tag: 'Youtube',
    imageURL: '',
  },
  {
    uid: '3',
    title: 'Elixor',
    url: 'https://www.elixor.com',
    createDate: new Date(),
    tag: 'Vk',
    imageURL: '',
  },
  {
    uid: '4',
    title: 'Elixor',
    url: 'https://www.elixor.com',
    createDate: new Date(),
    tag: 'Vk',
    imageURL: '',
  },
  {
    uid: '5',
    title: 'Elixor',
    url: 'https://www.elixor.com',
    createDate: new Date(),
    tag: 'Vk',
    imageURL: '',
  },
  {
    uid: '6',
    title: 'Elixor',
    url: 'https://www.elixor.com',
    createDate: new Date(),
    tag: 'Vk',
    imageURL: '',
  },
  {
    uid: '7',
    title: 'Elixor',
    url: 'https://www.elixor.com',
    createDate: new Date(),
    tag: 'Vk',
    imageURL: '',
  },
  {
    uid: '8',
    title: 'Elixor',
    url: 'https://www.elixor.com',
    createDate: new Date(),
    tag: 'Vk',
    imageURL: '',
  },
  {
    uid: '9',
    title: 'Elixor',
    url: 'https://www.elixor.com',
    createDate: new Date(),
    tag: 'Vk',
    imageURL: '',
  },
  {
    uid: '10',
    title: 'Elixor',
    url: 'https://www.elixor.com',
    createDate: new Date(),
    tag: 'Vk',
    imageURL: '',
  },
  {
    uid: '11',
    title: 'Elixor',
    url: 'https://www.elixor.com',
    createDate: new Date(),
    tag: 'Vk',
    imageURL: '',
  },
]

export default function Page({
  searchParams,
}: {
  searchParams: { [_: string]: string | string[] | undefined }
}) {
  const { linkUID } = searchParams
  const isAnySelectedLink = !!linkUID
  return (
    <div className="h-full w-full grid-rows-1 divide-x dark:divide-zinc-800 dark:border-zinc-800 md:grid md:grid-cols-[18rem,1fr] lg:grid-cols-[24rem,1fr] min-[1930px]:border-x">
      <div className="sticky top-0 flex h-screen w-full grow flex-col overflow-hidden">
        <div className="flex h-14 w-full shrink-0 items-center justify-center border-b text-center dark:border-b-neutral-800">
          <Link href="/">
            <span className="text-3xl font-extrabold">
              Sho<span className="tracking-wide">r</span>
              <span className="tracking-wider">t</span>y
            </span>
          </Link>
        </div>
        <Selector links={links} />
      </div>
      <div
        className={cn(
          isAnySelectedLink ? 'absolute top-0' : 'hidden',
          'z-20 w-full overflow-clip sm:relative md:flex md:flex-col'
        )}
      >
        <div className="sticky top-0 z-20 flex h-14 w-full shrink-0 items-center justify-between gap-4 border-b border-b-black/[.1] bg-zinc-50/[.5] px-6 backdrop-blur dark:border-b-white/[.15] dark:bg-zinc-950/[.3]">
          <div>
            {isAnySelectedLink ? (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="mr-32 mt-1"
                  asChild
                >
                  <Link href="/app">
                    <ArrowLeftIcon className="mr-2 size-4" />
                    Back
                  </Link>
                </Button>
              </>
            ) : (
              ''
            )}
          </div>
          <div className="flex gap-2">
            {isAnySelectedLink ? (
              <>
                <Button variant="outline" size="icon" disabled>
                  <ChevronLeftIcon className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" disabled>
                  <ChevronRightIcon className="h-4 w-4" />
                </Button>
                <div className="flex h-10 items-center overflow-hidden rounded-md bg-zinc-100 px-4 shadow-sm dark:bg-zinc-900">
                  <span>Youtube link</span>
                </div>
              </>
            ) : (
              ''
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button variant="link" className="flex items-center gap-3" asChild>
              <Link href="/">
                <span className="font-medium">Artyom Vlasov</span>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={avatar_artyom.src} alt="link-icon" />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </div>
        <div className="flex h-full w-full flex-col">
          {isAnySelectedLink ? (
            <Tabs>
              <TabsList className="sticky top-14 z-20 flex h-10 w-full shrink-0 items-center justify-center border-b bg-zinc-50/[.6] backdrop-blur dark:border-b-zinc-800 dark:bg-zinc-950/[.6]">
                <TabsTrigger value='overview' asChild>
                    <Button variant='link'>
                      Overview
                    </Button>
                </TabsTrigger>
                <TabsTrigger value='settings' asChild>
                    <Button variant='link'>
                      Settings
                    </Button>
                </TabsTrigger>
              </TabsList>
              <TabsContent value='overview'>
                <Overview />
              </TabsContent>
              <TabsContent value='settings'>
                <LinkSettings />
              </TabsContent>
            </Tabs>
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center">
              <div className="w-full max-w-xs px-2">
                <p className="text-center leading-relaxed">
                  Please select a link. If you don’t have any, then click on{' '}
                  <span
                    className="inline-flex items-center justify-center overflow-hidden rounded-lg border
                      border-black/[.1] bg-gray-200 px-2 py-1 align-middle dark:border-white/[.15] dark:bg-neutral-800"
                  >
                    <span className="text-xs">New</span>
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
