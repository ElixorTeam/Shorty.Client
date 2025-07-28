import { cn } from '@repo/ui/lib/utils'

export function BlockTitle({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        className,
        'after:bg-border mx-4 my-2 flex items-center font-[system-ui] text-xl font-stretch-ultra-expanded after:ml-4 after:flex after:h-px after:flex-1 lg:mx-6'
      )}
      {...props}
    />
  )
}
