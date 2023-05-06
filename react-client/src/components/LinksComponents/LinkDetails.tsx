import {
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid'
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline'
import ky from 'ky'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { apiURL } from '@/shared/fetcher'
import { LinkRecordType } from '@/shared/LinkRecordType'
import GroupInput from '@/components/Common/GroupInput'
import { convertDateTime } from '@/shared/convertDate'
import ButtonTemplate from '@/components/Common/ButtonTemplate'
import { useSWRConfig } from 'swr'
import IconButton from '@/components/Common/IconButton'
import { Link } from 'next-intl'

export default function LinkDetails({
  translate,
  linkData,
  hideLink,
  setSelectedLink
}: {
  translate: { [_: string]: string }
  linkData: LinkRecordType
  hideLink: () => void
  setSelectedLink: (link: LinkRecordType) => void
}) {
  const { mutate } = useSWRConfig()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const shortURL = `http://localhost:3031/${linkData.refRoute}`
  const removeLink = async () => {
    await ky.delete(`${apiURL}/links/${linkData.uid}`)
    await mutate(`${apiURL}/links/`)
    hideLink()
  }
  const editLink = async () => {
    if (inputValue.length === 0 || inputValue === linkData.title) return
    await ky
      .put(`${apiURL}/links/${linkData.uid}`, {
        json: {
          title: inputValue,
          ref: linkData.ref
        }
      })
      .then(() => {
        setSelectedLink({ ...linkData, title: inputValue })
        mutate(`${apiURL}/links/`)
        setIsEdit(false)
      })
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
          <p className="mt-1 line-clamp-1 pb-1 text-4xl font-bold">
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
          <IconButton>
            <DocumentDuplicateIcon className="h-5 w-5 text-neutral-500" />
          </IconButton>
        </CopyToClipboard>
        <Link target="_blank" href={shortURL}>
          <IconButton>
            <ArrowTopRightOnSquareIcon className="h-5 w-5 text-neutral-500" />
          </IconButton>
        </Link>
      </div>
    </>
  )
}
