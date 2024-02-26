import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import cn from '@/shared/lib/tailwind-merge'
import { LinkRecordType } from '@/shared/types/link-record-type'
import { Avatar, AvatarImage, AvatarFallback } from '@/shared/ui/avatar'

export default function TagGroupItem({ link }: { link: LinkRecordType }) {
  const searchParams = useSearchParams()
  const linkUID = searchParams.get('linkUid') ?? ''
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
    <Link href={{ pathname: '/main', query: { linkUid: link.uid } }}>
      <button
        type="button"
        className={cn(
          isActive ? 'relative bg-muted' : 'hover:bg-muted',
          'flex w-full items-center justify-center gap-3 py-3 pl-6 pr-4 transition-colors'
        )}
      >
        {isActive && (
          <div className="absolute inset-y-0 left-0 w-1 rounded-r-sm bg-muted" />
        )}
        <div className="size-10 shrink-0 overflow-hidden rounded-full">
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
            <span className="mt-[1px] shrink-0 text-xs leading-tight tracking-tight text-muted-foreground">
              {formattedDate()}
            </span>
          </div>
          <span className="truncate text-left text-xs leading-tight text-muted-foreground">
            {link.url}
          </span>
        </div>
      </button>
    </Link>
  )
}
