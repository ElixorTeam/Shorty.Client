import { type RecordType } from './record-type'

export default function useGroupedRecords(links: RecordType[]) {
  type GroupedLinks = { [key: string]: RecordType[] }

  return links.reduce<GroupedLinks>((groups, link) => {
    const key = link.subdomain
    return {
      ...groups,
      [key]: [...(groups[key] ?? []), link],
    }
  }, {})
}
