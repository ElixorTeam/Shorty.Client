'use client'
import { useState } from 'react'
import ListLinkHeader from './ListLinkHeader'
import { LinkRecordType } from '@/shared/LinkRecordType'
import LinkStickerBoard from '@/components/LinkStickerBoard'
import { convertDate } from '@/shared/convertDate'
import useSWR from 'swr'
import { apiURL } from '@/shared/fetcher'
import ky from 'ky'
import './LinkStyle.css'
const fetcher = async (url: string): Promise<LinkRecordType[]> =>
  await ky.get(url).json()

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
          <div
            className="loadingStyles inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        ) : null}
        {data?.map((item: LinkRecordType) => (
          <button
            key={item.uid}
            type="button"
            className={`${
              selectedLink
                ? `${
                    selectedLink.uid === item.uid
                      ? 'bg-sky-200 dark:text-black'
                      : 'bg-slate-100 dark:bg-[#1f1e29]'
                  }`
                : 'bg-slate-100 dark:bg-[#1f1e29]'
            } flex h-24 w-full items-center px-5 text-left md:px-10`}
            onClick={() => setSelectedLink(item)}
          >
            <div className="linkContainer grid w-full gap-1">
              <p className="linkHeader line-clamp-1 font-semibold">
                {item.title}
              </p>
              <div className="linkBody flex w-40 justify-between">
                <p className="line-clamp-2 text-xs text-gray-600">{item.ref}</p>
              </div>
              <p className="linkDate self-center text-xs">
                {convertDate(item.createDt)}
              </p>
            </div>
          </button>
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
