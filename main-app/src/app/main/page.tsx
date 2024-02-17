import Link from 'next/link'

import { auth } from '@/auth'
import AppHeader from '@/components/app-header'
import AppWorkspace from '@/components/app-workspace'
import Selector from '@/components/link-selector/link-selector'
import { cn } from '@/lib/utils'
import avatar_artyom from '@/public/avatar_artyom.jpg'
import { LinkRecordType } from '@/shared/link-record-type'

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

export default async function Page({
  searchParams,
}: {
  searchParams: { [_: string]: string | string[] | undefined }
}) {
  const { linkUID } = searchParams
  const isAnySelectedLink = !!linkUID
  const session = await auth()
  return (
    <div className="size-full grid-rows-1 divide-x dark:divide-zinc-800 dark:border-zinc-800 md:grid md:grid-cols-[18rem,1fr] lg:grid-cols-[24rem,1fr] min-[1930px]:border-x">
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
          'z-20 w-full overflow-clip bg-zinc-50 dark:bg-zinc-950 md:relative md:flex md:flex-col'
        )}
      >
        <div className="flex size-full flex-col">
          <AppHeader linkUID={linkUID} user={session?.user} />
          {isAnySelectedLink ? (
            <AppWorkspace />
          ) : (
            <div className="flex size-full flex-col items-center justify-center">
              <div className="w-full max-w-xs px-2">
                <p className="text-center leading-relaxed">
                  Please select a link. If you don’t have any, then click on{' '}
                  <span className="inline-flex items-center justify-center overflow-hidden rounded-md border bg-white px-2 py-1 align-middle dark:border-zinc-800 dark:bg-black">
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
