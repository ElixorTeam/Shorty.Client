import { LinkRecordType } from '@/shared/LinkRecordType'
import { SortKeyEnum } from '@/shared/SortKeyEnum'

// eslint-disable-next-line import/prefer-default-export
export const sortLinkData = (linkData: LinkRecordType[], key: SortKeyEnum) => {
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
