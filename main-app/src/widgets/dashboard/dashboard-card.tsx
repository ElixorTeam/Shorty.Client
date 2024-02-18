import { IconType } from '@/shared/types/icon-type'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/ui/card'

export default function DashboardCard({
  title,
  Icon,
  value,
  subvalue,
}: {
  title: string
  Icon: IconType
  value: string
  subvalue: string
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground size-4" />
      </CardHeader>
      <CardContent>
        <p className="text-2xl font-bold">{value}</p>
        <span className="text-muted-foreground text-xs">{subvalue}</span>
      </CardContent>
    </Card>
  )
}
