import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { cn } from '@repo/ui/lib/utils'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import {
  getFormattedDate,
  type RecordType,
  RecordTypesEnum,
} from '@/entities/record'

export default function TagGroupItem({ link }: { link: RecordType }) {
  const searchParams = useSearchParams()
  const linkUID = searchParams.get('linkUid') ?? ''
  const isActive = linkUID === link.uid

  return (
    <Link href={{ pathname: '/main', query: { linkUid: link.uid } }}>
      <button
        type="button"
        className={cn(
          isActive ? 'bg-muted/[.8]' : 'hover:bg-muted/[.5]',
          'flex w-full items-center justify-center gap-3 py-3 pl-6 pr-4 transition-colors'
        )}
      >
        <div className="size-10 shrink-0 overflow-hidden rounded-full">
          <Avatar>
            <AvatarImage
              src={`http://www.google.com/s2/favicons?domain=${link.urls[0] ?? ''}`}
              alt="link-icon"
            />
            <AvatarFallback>{link.title.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex w-full flex-col gap-1 overflow-hidden text-left">
          <div className="flex w-full items-center justify-between gap-2">
            <span className="truncate text-sm font-semibold leading-tight">
              {link.title}
            </span>
            <span className="text-muted-foreground mt-px shrink-0 text-xs leading-tight tracking-tight">
              {getFormattedDate(new Date(link.createDt))}
            </span>
          </div>
          <span className="text-muted-foreground truncate text-left text-xs leading-tight">
            {link.type === RecordTypesEnum.SINGLE
              ? link.urls[0]
              : `${link.urls.length.toString()} urls`}
          </span>
        </div>
      </button>
    </Link>
  )
}
