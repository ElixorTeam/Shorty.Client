import { Card, CardContent, CardHeader, CardTitle } from '@repo/ui/card'
import { type IconType } from '@repo/ui/icon-type'

export default function DashboardCard({
  title,
  Icon,
  value,
  description,
}: {
  title: string
  Icon: IconType
  value: string
  description: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground size-4" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <span className="text-muted-foreground text-xs">{description}</span>
      </CardContent>
    </Card>
  )
}
