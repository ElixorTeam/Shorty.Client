'use client'

import { useState } from 'react'
import useSWR from 'swr'
import ky from 'ky'
import { LinkRecordType } from '@/shared/LinkRecordType'
import LinkStickerBoard from '@/components/LinksComponents/LinkStickerBoard'
import { apiURL } from '@/shared/fetcher'
import ListLink from '@/components/LinksComponents/LinkList'

const fetcher = async (url: string): Promise<LinkRecordType[]> =>
  ky.get(url).json()

export default function LinksApp({
  translate
}: {
  translate: { [_: string]: string }
}) {
  const { data, isLoading } = useSWR(`${apiURL}/links/`, fetcher)
  const [selectedLink, setSelectedLink] = useState<LinkRecordType | null>(null)
  return (
    <div className="sm:grid sm:grid-cols-[200px_1fr] md:grid-cols-[300px_1fr]">
      <div className="relative z-30 h-[calc(100vh-64px)] overflow-y-hidden shadow-[inset_6px_6px_4px_-2px_rgb(0,0,0,0.05)] scrollbar-thin hover:overflow-y-auto">
        <ListLink
          translate={translate}
          linksData={data}
          isLoading={isLoading}
          selectedLink={selectedLink}
          setSelectedLink={(link: LinkRecordType) => setSelectedLink(link)}
        />
      </div>
      <div
        className={`${
          selectedLink ? 'block' : 'hidden md:block'
        } absolute left-0 top-0 z-[60] h-full w-screen overflow-y-auto shadow-[inset_0_0_6px_2px_rgb(0,0,0,0.05)] dark:shadow-[inset_0_0_8px_2px_rgb(0,0,0,0.05)] sm:static sm:z-30 sm:h-[calc(100vh-64px)] sm:w-full`}
      >
        {selectedLink ? (
          <LinkStickerBoard
            translate={translate}
            linkData={selectedLink}
            hideLink={() => setSelectedLink(null)}
            setSelectedLink={(link: LinkRecordType) => setSelectedLink(link)}
          />
        ) : null}
      </div>
    </div>
  )
}
