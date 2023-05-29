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
  const { data, isLoading, error } = useSWR(`${apiURL}/links/`, fetcher)
  const [selectedLink, setSelectedLink] = useState<LinkRecordType | null>(null)
  return (
    <div className="h-full sm:grid sm:grid-cols-[200px_1fr] md:grid-cols-[300px_1fr]">
      <div className="mx-4 flex h-fit max-h-[calc(100%_-_10px)] flex-col overflow-hidden rounded-2xl shadow-lg sm:mx-0 sm:max-h-[calc(100%_-_20px)] sm:shadow-2xl">
        <ListLink
          translate={translate}
          linksData={data}
          isLoading={isLoading || error}
          selectedLink={selectedLink}
          setSelectedLink={(link: LinkRecordType) => setSelectedLink(link)}
        />
      </div>
      <div
        className={`${
          selectedLink ? 'block' : 'hidden md:block'
        } absolute left-0 top-0 z-[60] h-full w-screen overflow-y-auto sm:static sm:z-30 sm:h-full sm:w-full`}
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
