import { LinkUidProvider } from '../../models/link-uid-context'
import AnalyticsBlock from './analytics-block'
import DescriptionBlock from './description-block'
import SharingBlock from './sharing-block'

export default function Dashboard({ linkUid }: Readonly<{ linkUid: string }>) {
  return (
    <LinkUidProvider value={linkUid}>
      <div className="@container/main flex flex-1 flex-col gap-4 py-4">
        <DescriptionBlock />
        <h1 className="after:bg-border font-stretch-ultra-expanded mx-4 my-2 flex items-center font-[system-ui] text-xl after:ml-4 after:flex after:h-px after:flex-1 lg:mx-6">
          Sharing tools
        </h1>
        <SharingBlock />
        <h1 className="after:bg-border font-stretch-ultra-expanded mx-4 my-2 flex items-center font-[system-ui] text-xl after:ml-4 after:flex after:h-px after:flex-1 lg:mx-6">
          Analytics
        </h1>
        <AnalyticsBlock />
      </div>
    </LinkUidProvider>
  )
}
