import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { LinkRecordType } from '@/shared/link-record-type'
import { cn } from '@/lib/utils'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function TagGroupItem({ link }: { link: LinkRecordType }) {
  const searchParams = useSearchParams()
  const linkUID = searchParams.get('linkUID') ?? ''
  const isActive = linkUID === link.uid

  const formattedDate = () => {
    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
    }

    if (link.createDate.getFullYear() !== new Date().getFullYear())
      options.year = '2-digit'

    return link.createDate.toLocaleDateString('en-US', options)
  }

  return (
    <Link href={{ pathname: '/app', query: { linkUID: link.uid } }}>
      <button
        type="button"
        className={cn(
          isActive ? 'relative bg-zinc-300 dark:bg-zinc-700' : '',
          'flex w-full items-center justify-center gap-3 py-3 pl-6 pr-4 transition-colors hover:bg-zinc-200 dark:hover:bg-zinc-900'
        )}
      >
        {isActive && (
          <div className="absolute inset-y-0 left-0 w-1 rounded-r-sm bg-zinc-800 dark:bg-zinc-200" />
        )}
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Avatar>
            <AvatarImage src={link.imageURL} alt="link-icon" />
            <AvatarFallback>{link.title.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex h-9 w-full flex-col overflow-hidden text-left">
          <div className="flex w-full items-center justify-between gap-2">
            <span className="line-clamp-1 truncate text-sm font-semibold leading-tight">
              {link.title}
            </span>
            <span className="mt-[1px] shrink-0 text-xs leading-tight tracking-tight text-zinc-700 dark:text-zinc-500">
              {formattedDate()}
            </span>
          </div>
          <span className="line-clamp-1 text-ellipsis text-left text-xs leading-tight text-zinc-500 dark:text-zinc-500">
            {link.url}
          </span>
        </div>
      </button>
    </Link>
  )
}
