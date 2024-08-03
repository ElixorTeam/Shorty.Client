import { type IconType } from '@repo/ui/icon-type'
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
      <div className="text-muted-foreground flex shrink-0 items-center">
        <Icon className="mr-1 size-4" />
        <span>{title}</span>
      </div>
      <div className="truncate">{children}</div>
    </>
  )
}
