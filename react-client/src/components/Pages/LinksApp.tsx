'use client'

import { useState } from 'react'
import useSWR from 'swr'
import ky from 'ky'
import { LinkRecordType } from '@/shared/LinkRecordType'
import LinkStickerBoard from '@/components/LinksComponents/LinkStickerBoard'
import { apiURL } from '@/shared/fetcher'
import ListLinkItem from '@/components/LinksComponents/ListLinkItem'
import ListLinkHeader from '@/components/LinksComponents/ListLinkHeader'

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
      <div className="relative z-30 h-[calc(100vh-64px)] overflow-y-hidden shadow-[8px_0px_10px_0px_rgba(0,0,0,0.02)] scrollbar-thin hover:overflow-y-auto dark:shadow-[8px_0px_10px_0px_rgba(0,0,0,0.1)]">
        <ListLinkHeader translate={translate} />
        {isLoading ? (
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div
              className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
              role="status"
            >
              <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                Loading...
              </span>
            </div>
          </div>
        ) : null}
        {data?.map((item: LinkRecordType) => (
          <ListLinkItem
            onClick={() => setSelectedLink(item)}
            linkData={item}
            selectedUID={selectedLink?.uid}
          />
        ))}
      </div>
      <div
        className={`${
          selectedLink ? 'block' : 'hidden'
        } absolute left-0 top-0 z-[60] h-full w-screen overflow-y-auto sm:static sm:z-30 sm:h-[calc(100vh-64px)] sm:w-full`}
      >
        {selectedLink ? (
          <LinkStickerBoard
            translate={translate}
            linkData={selectedLink}
            reloadLinks={() => mutate().then()}
            hideLink={() => setSelectedLink(null)}
          />
        ) : null}
      </div>
    </div>
  )
}
