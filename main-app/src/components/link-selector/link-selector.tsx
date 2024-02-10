import SelectorTagGroup from '@/components/link-selector/tag-group'
import { LinkRecordType } from '@/shared/link-record-type'
import { LinkSelectorContextProvider } from './selector-context'
import SelectorHeader from '@/components/link-selector/selector-header'
import useGroupedLinks from '@/components/link-selector/use-grouped-links'
import { ScrollArea } from '@/components/ui/scroll-area'

export default function Selector({ links }: { links: LinkRecordType[] }) {
  const groupedLinks = useGroupedLinks(links)
  return (
    <LinkSelectorContextProvider>
      <nav className="flex h-full w-full flex-col overflow-hidden">
        <SelectorHeader />
        <ScrollArea className="h-full w-full">
          <ul className="flex flex-col gap-2 px-3 pb-3">
            {Object.entries(groupedLinks).map(([tag, tagLinks]) => (
              <li key={tag}>
                <SelectorTagGroup tagTitle={tag} links={tagLinks} />
              </li>
            ))}
          </ul>
        </ScrollArea>
      </nav>
    </LinkSelectorContextProvider>
  )
}
