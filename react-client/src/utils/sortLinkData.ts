import { LinkRecordType } from '@/shared/LinkRecordType'
import { TableKeyEnum } from '@/shared/TableKeyEnum'

// eslint-disable-next-line import/prefer-default-export
export const sortLinkData = (linkData: LinkRecordType[], key: TableKeyEnum) => {
  const sortedLinkData = [...linkData]
  if (key === TableKeyEnum.Alphabet) {
    sortedLinkData.sort((a, b) => a.title.localeCompare(b.title))
  } else if (key === TableKeyEnum.Last) {
    sortedLinkData.sort(
      (a, b) => new Date(b.createDt).getTime() - new Date(a.createDt).getTime()
    )
  }
  return sortedLinkData
}
