import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import AddNewLinkDialog from '@/components/Dialogs/AddNewLinkDialog'
import LinkGroup from '@/components/Selectors/LinkGroup'
import avatar_artyom from '@/public/avatar_artyom.jpg'
import { LinkRecordType } from '@/shared/LinkRecordType'

export default function LinkSelector() {
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
    <div className="flex h-full w-full flex-col overflow-hidden border-y bg-slate-50 dark:border-y-white/[.15] dark:bg-black">
      <div className="flex h-12 w-full items-center justify-between border-b py-2 pl-6 pr-2 dark:border-b-white/[.15]">
        <p className="text-2xl font-semibold">Links</p>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border bg-slate-100 transition hover:bg-white dark:border-white/[.15] dark:bg-neutral-900 dark:hover:bg-neutral-800"
          >
            <MagnifyingGlassIcon className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
          </button>
          <AddNewLinkDialog />
        </div>
      </div>
      <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300/[.6] scrollbar-corner-transparent">
        {Object.entries(groupedLinks).map(([tag, tagLinks]) => (
          <LinkGroup key={tag} tagTitle={tag} links={tagLinks} />
        ))}
      </div>
    </div>
  )
}
