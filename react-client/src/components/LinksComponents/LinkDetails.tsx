import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import ky from 'ky'
import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { apiURL } from '@/shared/fetcher'
import { LinkRecordType } from '@/shared/LinkRecordType'
import GroupInput from '@/components/Common/GroupInput'
import { convertDateTime } from '@/shared/convertDate'
import ButtonTemplate from '@/components/Common/ButtonTemplate'

export default function LinkDetails({
  translate,
  linkData,
  hideLink,
  reloadLinks,
  setSelectedLink
}: {
  translate: { [_: string]: string }
  linkData: LinkRecordType
  hideLink: () => void
  reloadLinks: () => void
  setSelectedLink: (link: LinkRecordType) => void
}) {
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const shortURL = `http://localhost:3031/${linkData.refRoute}`
  const removeLink = async () => {
    try {
      await ky.delete(`${apiURL}/links/${linkData.uid}`)
      reloadLinks()
      hideLink()
    } catch {
      /* empty */
    }
  }
  const editLink = async () => {
    if (!(inputValue.length === 0 || inputValue === linkData.title)) {
      try {
        await ky.put(`${apiURL}/links/${linkData.uid}`, {
          json: {
            title: inputValue,
            ref: linkData.ref
          }
        })
        setSelectedLink({ ...linkData, title: inputValue })
        reloadLinks()
      } catch {
        /* empty */
      }
    }
    setIsEdit(false)
  }
  return (
    <>
      <div className="flex h-12 items-start justify-between">
        {isEdit ? (
          <input
            type="text"
            onChange={event => setInputValue(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter') editLink().then()
            }}
            defaultValue={linkData.title}
            className="mr-6 w-full rounded-md border border-gray-300 text-4xl font-bold focus:outline-none"
          />
        ) : (
          <p className="line-clamp-1 pb-1 text-4xl font-bold">
            {linkData.title}
          </p>
        )}
        <div className="mt-3 flex flex-row items-center space-x-4">
          {isEdit ? (
            <>
              <ButtonTemplate onClick={editLink}>
                <CheckIcon className="h-6 w-6" />
              </ButtonTemplate>
              <ButtonTemplate onClick={() => setIsEdit(false)}>
                <XMarkIcon className="h-6 w-6" />
              </ButtonTemplate>
            </>
          ) : (
            <>
              <ButtonTemplate onClick={removeLink}>
                <TrashIcon className="h-6 w-6 text-red-700" />
              </ButtonTemplate>
              <ButtonTemplate onClick={() => setIsEdit(true)}>
                <PencilIcon className="h-5 w-5" />
              </ButtonTemplate>
            </>
          )}
        </div>
      </div>
      <p className="line-clamp-1">
        {translate.windowDate} {convertDateTime(linkData.createDt)}
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
        <a target="_blank" href={shortURL} rel="noreferrer">
          <button
            type="button"
            className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors ease-linear hover:bg-neutral-100 active:bg-neutral-200"
          >
            <ArrowTopRightOnSquareIcon className="h-5 w-5 text-neutral-500" />
          </button>
        </a>
      </div>
    </>
  )
}
