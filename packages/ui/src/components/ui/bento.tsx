import { cn } from '@repo/ui/lib/utils'

function Bento({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'relative flex flex-col overflow-hidden p-4 sm:p-8',
        className
      )}
      {...props}
    />
  )
}

function BentoTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'max-w-5xl text-left text-xl tracking-tight md:text-2xl md:leading-snug',
        className
      )}
      {...props}
    />
  )
}

function BentoDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'text-muted-foreground mx-0 my-2 max-w-sm text-left text-sm font-normal md:text-sm',
        className
      )}
      {...props}
    />
  )
}

function BentoContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('size-full', className)} {...props} />
}

export { Bento, BentoContent, BentoDescription, BentoTitle }
