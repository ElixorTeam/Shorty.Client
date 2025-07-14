import { ChartAreaInteractive } from './chart-area-interactive'
import { SectionCards } from './section-cards'

export default function AnalyticsBlock({ linkUid }: { linkUid: string }) {
  return (
    <div className="flex flex-col gap-4">
      <SectionCards linkUid={linkUid} />
      <div className="*:data-[slot=card]:shadow-xs px-4 lg:px-6">
        <ChartAreaInteractive linkUid={linkUid} />
      </div>
    </div>
  )
}
