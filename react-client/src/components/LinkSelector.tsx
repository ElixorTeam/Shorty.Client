import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import Image from 'next/image'

import avatar_artyom from '@/public/avatar_artyom.jpg'

function LinkItem({ isActive }: { isActive: boolean }) {
  return (
    <button
      type="button"
      className={clsx(
        isActive ? 'relative bg-sky-100 dark:bg-neutral-900' : '',
        'flex w-full items-center justify-center gap-3 py-3 pl-6 pr-4'
      )}
    >
      {isActive && (
        <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-sky-400" />
      )}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={avatar_artyom.src}
          width={avatar_artyom.width}
          height={avatar_artyom.height}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex h-14 w-full flex-col gap-1 overflow-hidden text-left">
        <div className="flex w-full items-center justify-between gap-2">
          <p className="line-clamp-1 truncate text-sm font-semibold leading-tight">
            Youtube Channelfrfrfr
          </p>
          <p className="mt-[1px] shrink-0 text-xs leading-tight tracking-tight text-gray-700">
            2 hours ago
          </p>
        </div>
        <p className="line-clamp-2 text-ellipsis text-left text-xs leading-tight text-gray-500">
          Please add more information about your pesonal web site so we can
          address
        </p>
      </div>
    </button>
  )
}

export default function LinkSelector() {
  const links = Array.from(Array(10).keys())
  return (
    <div className="flex h-full w-full flex-col overflow-hidden border-y bg-slate-50 dark:border-y-white/[.2] dark:bg-black">
      <div className="my-2 flex h-10 w-full items-center justify-between pl-6 pr-2">
        <p className="text-2xl font-semibold">Links</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border bg-slate-100 transition hover:bg-white dark:border-white/[.15] dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
          </button>
          <button
            type="button"
            className="flex h-8 items-center justify-center overflow-hidden rounded-lg border border-black/[.1] bg-sky-400 px-4 transition hover:bg-sky-300"
          >
            <p className="text-white">New</p>
          </button>
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300/[.6] scrollbar-corner-transparent">
        <ul className="flex h-full w-full flex-col">
          <li className="w-full">
            <LinkItem isActive />
          </li>
          {links.map((item) => (
            <li key={item.valueOf()} className="w-full">
              <LinkItem isActive={false} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
