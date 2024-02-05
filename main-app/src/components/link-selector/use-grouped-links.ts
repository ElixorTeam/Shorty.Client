import { LinkRecordType } from '@/shared/link-record-type'
import { useMemo } from 'react'

export default function useGroupedLinks(links: LinkRecordType[]) {
  type GroupedLinks = { [key: string]: LinkRecordType[] }

  return links.reduce<GroupedLinks>((groups, link) => {
    const key = link.tag
    return {
      ...groups,
      [key]: [...(groups[key] ?? []), link],
    }
  }, {})
}
