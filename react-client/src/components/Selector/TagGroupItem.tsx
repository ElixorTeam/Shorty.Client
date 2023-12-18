import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import avatar_artyom from '@/public/avatar_artyom.jpg'
import { LinkRecordType } from '@/shared/LinkRecordType'

export default function TagGroupItem({ link }: { link: LinkRecordType }) {
  const searchParams = useSearchParams()
  const linkUID = searchParams.get('linkUID') ?? ''
  const isActive = linkUID === link.uid
  const formattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    }
    if (link.createDate.getFullYear() !== new Date().getFullYear()) {
      options.year = '2-digit'
    }
    return link.createDate.toLocaleDateString('en-US', options)
  }
  return (
    <Link href={{ pathname: '/app', query: { linkUID: link.uid } }}>
      <button
        type="button"
        className={clsx(
          isActive ? 'relative bg-sky-100 dark:bg-neutral-900' : '',
          'flex w-full items-center justify-center gap-3 py-3 pl-6 pr-4 transition-colors'
        )}
      >
        {isActive && (
          <div className="absolute inset-y-0 left-0 w-1 rounded-r-sm bg-sky-400" />
        )}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          {link.imageURL ? (
            <Image
              src={avatar_artyom.src}
              width={48}
              height={48}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-200 dark:bg-neutral-700  ">
              <span>{link.title.charAt(0)}</span>
            </div>
          )}
        </div>
        <div className="flex h-9 w-full flex-col overflow-hidden text-left">
          <div className="flex w-full items-center justify-between gap-2">
            <p className="line-clamp-1 truncate text-sm font-semibold leading-tight">
              {link.title}
            </p>
            <p className="mt-[1px] shrink-0 text-xs leading-tight tracking-tight text-gray-700 dark:text-neutral-500">
              {formattedDate()}
            </p>
          </div>
          <p className="line-clamp-1 text-ellipsis text-left text-xs leading-tight text-gray-500 dark:text-neutral-500">
            {link.url}
          </p>
        </div>
      </button>
    </Link>
  )
}
