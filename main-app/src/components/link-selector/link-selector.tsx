'use client'

import SelectorHeader from '@/components/link-selector/selector-header'
import SelectorTagGroup from '@/components/link-selector/tag-group'
import useGroupedLinks from '@/components/link-selector/use-grouped-links'
import { ScrollArea } from '@/components/ui/scroll-area'
import { LinkRecordType } from '@/shared/link-record-type'

import { LinkSelectorContextProvider } from './selector-context'

export default function Selector({ links }: { links: LinkRecordType[] }) {
  const groupedLinks = useGroupedLinks(links)
  return (
    <LinkSelectorContextProvider>
      <nav className="flex size-full flex-col overflow-hidden">
        <SelectorHeader />
        <ScrollArea className="size-full">
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
