import { LinkRecordType } from '@/shared/types/link-record-type'

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
