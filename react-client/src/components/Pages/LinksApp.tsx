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
  const { data, mutate, isLoading } = useSWR(`${apiURL}/links/`, fetcher)
  const [selectedLink, setSelectedLink] = useState<LinkRecordType | null>(null)
  return (
    <div className="sm:grid sm:grid-cols-[200px_1fr] md:grid-cols-[300px_1fr]">
      <div className="relative z-30 h-[calc(100vh-64px)] overflow-y-hidden scrollbar-thin hover:overflow-y-auto">
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
          selectedLink ? 'block' : 'hidden'
        } absolute left-0 top-0 z-[60] h-full w-screen overflow-y-auto shadow-inner sm:static sm:z-30 sm:h-[calc(100vh-64px)] sm:w-full`}
      >
        {selectedLink ? (
          <LinkStickerBoard
            translate={translate}
            linkData={selectedLink}
            reloadLinks={() => mutate().then()}
            hideLink={() => setSelectedLink(null)}
            setSelectedLink={(link: LinkRecordType) => setSelectedLink(link)}
          />
        ) : null}
      </div>
    </div>
  )
}
