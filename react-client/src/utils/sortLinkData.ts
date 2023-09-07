import { LinkRecordType } from '@/shared/LinkRecordType'
import { SortKeyEnum } from '@/shared/SortKeyEnum'

const sortLinkData = (linkData: LinkRecordType[], key: SortKeyEnum) => {
  const sortedLinkData = [...linkData]
  if (key === SortKeyEnum.Name) {
    sortedLinkData.sort((a, b) => a.title.localeCompare(b.title))
  } else if (key === SortKeyEnum.Date) {
    sortedLinkData.sort(
      (a, b) => new Date(b.createDt).getTime() - new Date(a.createDt).getTime()
    )
  }
  return sortedLinkData
}

export default sortLinkData
