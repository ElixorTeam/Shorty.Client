import { Breadcrumb, BreadcrumbList } from '@repo/ui/breadcrumb'
import { cn } from '@repo/ui/lib/utils'
import { Separator } from '@repo/ui/separator'
import { SidebarTrigger } from '@repo/ui/sidebar'

export function NavigationHeader({
  children,
  className,
  ...props
}: {
  children: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <header
      className={cn(
        'flex h-12 shrink-0 items-center gap-2 border-b px-4',
        className
      )}
      {...props}
    >
      <SidebarTrigger />
      <Separator
        orientation="vertical"
        className="mr-2 data-[orientation=vertical]:h-4"
      />
      <Breadcrumb>
        <BreadcrumbList>{children}</BreadcrumbList>
      </Breadcrumb>
    </header>
  )
}
