import { type RecordType } from './record-type'

export default function useGroupedRecords(links: RecordType[]) {
  type GroupedLinks = { [key: string]: RecordType[] }

  return links.reduce<GroupedLinks>((groups, link) => {
    const tag = link.tags.length > 0 ? link.tags[0] : ''
    const key = tag || 'Untagged'
    return {
      ...groups,
      [key]: [...(groups[key] ?? []), link],
    }
  }, {})
}
