import AddNewLinkDialog from '@/components/Dialogs/AddNewLinkDialog'
import SortKeyMenu from '@/components/Dialogs/SortKeyMenu'
import SelectorSearchField from '@/components/Selector/SelectorSearchField'
import SelectorTagGroup from '@/components/Selector/SelectorTagGroup'
import avatar_artyom from '@/public/avatar_artyom.jpg'
import { LinkRecordType } from '@/shared/LinkRecordType'

export default function Selector() {
  const links: LinkRecordType[] = [
    {
      uid: '1',
      title: 'Youtube Channelfrfrfr',
      url: 'https://www.youtube.com/c/Ap73MKa',
      createDate: new Date(),
      tag: 'Youtube',
      imageURL: avatar_artyom.src,
    },
    {
      uid: '2',
      title: 'VK',
      url: 'https://www.vk.com',
      createDate: new Date(),
      tag: 'Youtube',
      imageURL: '',
    },
    {
      uid: '3',
      title: 'Elixor',
      url: 'https://www.elixor.com',
      createDate: new Date(),
      tag: 'Vk',
      imageURL: '',
    },
  ]
  const groupedLinks = links.reduce(
    (groups: { [key: string]: LinkRecordType[] }, link) => {
      const key = link.tag
      if (!groups[key]) {
        groups[key] = []
      }
      groups[key].push(link)
      return groups
    },
    {}
  )
  return (
    <nav className="flex h-full w-full flex-col overflow-hidden border-y bg-slate-50 dark:border-y-white/[.15] dark:bg-black">
      <div className="flex h-12 w-full items-center justify-between border-b p-2 dark:border-b-white/[.15]">
        <SelectorSearchField />
        <div className="flex gap-2">
          <SortKeyMenu />
          <AddNewLinkDialog />
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300/[.6] scrollbar-corner-transparent">
        {Object.entries(groupedLinks).map(([tag, tagLinks]) => (
          <SelectorTagGroup key={tag} tagTitle={tag} links={tagLinks} />
        ))}
      </div>
    </nav>
  )
}
