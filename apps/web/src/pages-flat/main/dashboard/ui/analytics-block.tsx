import { ChartAreaInteractive } from './chart-area-interactive'
import { SectionCards } from './section-cards'

export default function AnalyticsBlock() {
  return (
    <div className="flex flex-col gap-4">
      <SectionCards />
      <div className="*:data-[slot=card]:shadow-xs px-4 lg:px-6">
        <ChartAreaInteractive />
      </div>
    </div>
  )
}
