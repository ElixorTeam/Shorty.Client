import { LinkRecordType } from '@/shared/LinkRecordType'
import { SortKeyEnum } from '@/shared/SortKeyEnum'

const sortingStrategies = {
  [SortKeyEnum.Name]: (a: LinkRecordType, b: LinkRecordType) =>
    a.title.localeCompare(b.title),
  [SortKeyEnum.Date]: (a: LinkRecordType, b: LinkRecordType) =>
    new Date(b.createDt).getTime() - new Date(a.createDt).getTime(),
}

const sortLinks = (links: LinkRecordType[], sortKey: SortKeyEnum) => {
  const sortedLinks = [...links]
  const sortStrategy = sortingStrategies[sortKey]
  if (sortStrategy) sortedLinks.sort(sortStrategy)
  return sortedLinks
}

export default sortLinks
