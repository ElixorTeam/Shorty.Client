import { IconType } from '@/shared/icon-type'
import { ReactNode } from 'react'

export default function DescriptionItem({
  title,
  Icon,
  children,
}: {
  title: string
  Icon: IconType
  children: ReactNode
}) {
  return (
    <>
      <div className="flex shrink-0 items-center text-zinc-600 dark:text-zinc-400">
        <Icon className="mr-1 size-4" />
        <span>{title}</span>
      </div>
      <div className="truncate">{children}</div>
    </>
  )
}
