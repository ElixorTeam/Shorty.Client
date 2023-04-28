'use client'
import { LinkRecordType } from '@/shared/LinkRecordType'
import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import { convertDateTime } from '@/shared/convertDate'
import QRGenerator from '@/components/QRGenerator'
import ky from 'ky'
import { apiURL } from '@/shared/fetcher'
import './LinkStyle.css'
import { useState } from 'react'
import GroupInput from '@/components/Common/GroupInput'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useRouter } from 'next-intl/client'
import LineChart from '@/components/LineChart'
import BrowserDoughnutChart from '@/components/BrowserDoghnutChart'

export default function LinkDescription({
  translate,
  linkData,
  hideLink,
  reloadLinks
}: {
  translate: { [_: string]: string }
  linkData: LinkRecordType
  hideLink: () => void
  reloadLinks: () => void
}) {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const shortURL = 'http://localhost:3031/' + linkData.refRoute
  const removeLink = async () => {
    await ky.delete(`${apiURL}/links/${linkData.uid}`)
    reloadLinks()
    hideLink()
  }
  const router = useRouter()
  const editLink = () => {
    if (!(inputValue.length === 0 || inputValue === linkData.title)) {
      ky.put(`${apiURL}/links/${linkData.uid}`, {
        json: {
          title: inputValue,
          ref: linkData.ref
        }
      })
      reloadLinks()
      linkData.title = inputValue
    }
    setIsEdit(false)
  }
  return (
    <>
      <div className="sticky flex h-16 w-full items-center justify-between bg-white px-6 shadow-[0px_8px_10px_0px_rgba(0,0,0,0.05)] dark:bg-[#23212e] dark:shadow-[0px_8px_10px_0px_rgba(0,0,0,0.1)] sm:hidden">
        <p className="line-clamp-1 text-lg font-bold ">
          {translate['windowTitle']}
        </p>
        <button type="button" onClick={hideLink}>
          <XMarkIcon className="h-6 w-6 dark:text-white" />
        </button>
      </div>
      <div className="flex max-w-5xl flex-wrap gap-4 bg-[#eef1f6] p-3 dark:bg-[#1c1a25] min-[640px]:bg-transparent md:p-6">
        <div className="h-[232px] w-full max-w-2xl rounded-xl bg-white px-4 py-2 dark:bg-[#23212e] md:px-10 md:py-6">
          <div className="flex items-start justify-between">
            {isEdit ? (
              <input
                type="text"
                onChange={event => setInputValue(event.target.value)}
                defaultValue={linkData.title}
                className="mr-6 w-full border-b-2 border-black text-4xl font-bold focus:outline-none"
              />
            ) : (
              <p className="line-clamp-1 pb-1 text-4xl font-bold">
                {linkData.title}
              </p>
            )}
            <div className="mt-3 flex flex-row items-center space-x-4">
              {isEdit ? (
                <>
                  <button
                    type="button"
                    onClick={editLink}
                    className="transition hover:scale-105 active:scale-95"
                  >
                    <CheckIcon className="h-6 w-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEdit(false)}
                    className="transition hover:scale-105 active:scale-95"
                  >
                    <XMarkIcon className="h-6 w-6" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={removeLink}
                    className="transition hover:scale-105 active:scale-95"
                  >
                    <TrashIcon className="h-6 w-6 text-red-700" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEdit(true)}
                    className="transition hover:scale-105 active:scale-95"
                  >
                    <PencilIcon className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>
          <p className="line-clamp-1">
            {translate['windowDate']} {convertDateTime(linkData.createDt)}
          </p>
          <div className="mt-4">
            <GroupInput value={linkData.ref} label="Link" />
          </div>
          <div className="mt-2 flex gap-2">
            <div className="w-[320px]">
              <GroupInput value={shortURL} label="Short link" />
            </div>
            <CopyToClipboard text={shortURL}>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors ease-linear hover:bg-neutral-100 active:bg-neutral-200"
              >
                <DocumentDuplicateIcon className="h-5 w-[20px] text-neutral-500" />
              </button>
            </CopyToClipboard>
            <a target="_blank" href={shortURL}>
              <button
                type="button"
                className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors ease-linear hover:bg-neutral-100 active:bg-neutral-200"
              >
                <ArrowTopRightOnSquareIcon className="h-5 w-5 text-neutral-500" />
              </button>
            </a>
          </div>
        </div>
        <div className="h-full w-fit rounded-xl bg-white p-4 dark:bg-[#23212e] sm:h-fit">
          <QRGenerator translate={translate} hrefLink={shortURL} />
        </div>
        <div className="rounded-xl bg-white p-4 dark:bg-[#23212e]">
          <div className="h-[200px] w-[200px]">
            <BrowserDoughnutChart
              data={[
                { label: 'Chrome', value: 45 },
                { label: 'Firefox', value: 30 },
                { label: 'Safari', value: 10 },
                { label: 'Edge', value: 8 },
                { label: 'Other', value: 7 }
              ]}
            />
          </div>
        </div>
        <div className="rounded-xl bg-white p-4 dark:bg-[#23212e]">
          <div className="h-[200px] w-[392px]">
            <LineChart
              data={[100, 200, 150, 300, 250, 400, 350]}
              labels={[
                '01.01.23',
                '02.01.23',
                '03.01.23',
                '04.01.23',
                '05.01.23',
                '06.01.23',
                '07.01.23'
              ]}
            />
          </div>
        </div>
      </div>
    </>
  )
}
