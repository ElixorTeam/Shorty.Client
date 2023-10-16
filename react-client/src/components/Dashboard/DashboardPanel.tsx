import { cva, VariantProps } from 'class-variance-authority'
import { HTMLAttributes } from 'react'

const dashboardItemVariants = cva(
  'flex w-full shrink grow flex-col overflow-hidden rounded-2xl border bg-white shadow-sm dark:border-white/[.15] dark:bg-gradient-to-br dark:from-neutral-900 dark:to-black',
  {
    variants: {
      size: {
        default: 'h-72 basis-[16rem]',
        lg: 'h-96 max-w-full',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
)

type DashboardItemType = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof dashboardItemVariants>

function DashboardPanel({ size, ...props }: DashboardItemType) {
  return <div {...props} className={dashboardItemVariants({ size })} />
}

export { DashboardPanel, dashboardItemVariants }
