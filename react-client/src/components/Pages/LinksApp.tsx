'use client'

import LinkStickerBoard from '@/components/LinksComponents/LinkStickerBoard'
import ListLink from '@/components/LinksComponents/LinkList'
import { useAppSelector } from '@/redux/hooks'

export default function LinksApp({
  translate
}: {
  translate: { [_: string]: string }
}) {
  const selectedLink = useAppSelector(state => state.selectedLink.selected)
  return (
    <div className="h-full sm:grid sm:grid-cols-[200px_1fr] md:grid-cols-[300px_1fr]">
      <div
        className="mx-4 flex h-fit max-h-[calc(100%_-_10px)] flex-col overflow-hidden rounded-2xl shadow-lg sm:mx-0
         sm:max-h-[calc(100%_-_20px)] sm:shadow-2xl"
      >
        <ListLink translate={translate} />
      </div>
      <div
        className={`${
          selectedLink ? 'block' : 'hidden md:block'
        } absolute left-0 top-0 z-[60] h-full w-screen overflow-y-auto sm:static sm:z-30 sm:h-full sm:w-full`}
      >
        {selectedLink && (
          <LinkStickerBoard translate={translate} linkData={selectedLink} />
        )}
      </div>
    </div>
  )
}
