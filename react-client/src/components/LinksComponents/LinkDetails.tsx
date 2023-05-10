import {
  XMarkIcon,
  CheckIcon,
  ArrowTopRightOnSquareIcon
} from '@heroicons/react/24/solid'
import {
  DocumentDuplicateIcon,
  TrashIcon,
  PencilIcon
} from '@heroicons/react/24/outline'
import ky from 'ky'
import React, { useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { apiURL } from '@/shared/fetcher'
import { LinkRecordType } from '@/shared/LinkRecordType'
import GroupInput from '@/components/Common/GroupInput'
import { convertDateTime } from '@/shared/convertDate'
import { useSWRConfig } from 'swr'
import IconButton from '@/components/Common/IconButton'
import { Link } from 'next-intl'
import toast from 'react-hot-toast'

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
  const editInputRef = useRef<HTMLInputElement>(null)
  const shortURL = `http://localhost:3031/${linkData.refRoute}`
  const removeLink = async () =>
    ky
      .delete(`${apiURL}/links/${linkData.uid}`)
      .then(() => {
        mutate(`${apiURL}/links/`)
        hideLink()
        toast.success(translate.toastLinkDelError)
      })
      .catch(() => toast.error(translate.toastLinkDelSuccess))

  const editLink = async () => {
    if (inputValue.length === 0 || inputValue === linkData.title) return
    ky.put(`${apiURL}/links/${linkData.uid}`, {
      json: {
        title: inputValue,
        ref: linkData.ref
      }
    })
      .then(() => {
        setSelectedLink({ ...linkData, title: inputValue })
        mutate(`${apiURL}/links/`)
        setIsEdit(false)
        toast.success(translate.toastLinkEditSuccess)
      })
      .catch(() => toast.error(translate.toastLinkEditError))
  }

  const setEditMode = () => {
    setIsEdit(true)
    setTimeout(() => {
      if (editInputRef.current) {
        editInputRef.current.focus()
      }
    }, 0)
  }
  return (
    <div className="h-48">
      <div className="flex h-12 items-start justify-between">
        {isEdit ? (
          <input
            ref={editInputRef}
            type="text"
            onChange={event => setInputValue(event.target.value)}
            onKeyDown={event => {
              if (event.key === 'Enter') editLink().then()
              else if (event.key === 'Escape') setIsEdit(false)
            }}
            defaultValue={linkData.title}
            className="mr-6 mt-3 h-9 w-full rounded-md border border-gray-300 pl-1 text-3xl font-bold focus:outline-none"
          />
        ) : (
          <p className="mt-3 line-clamp-1 h-9 pb-1 text-3xl font-bold">
            {linkData.title}
          </p>
        )}
        <div className="mt-3 flex flex-row items-center gap-2">
          {isEdit ? (
            <>
              <IconButton onClick={editLink}>
                <CheckIcon className="h-5 w-5 text-neutral-500" />
              </IconButton>
              <IconButton onClick={() => setIsEdit(false)}>
                <XMarkIcon className="h-5 w-5 text-neutral-500" />
              </IconButton>
            </>
          ) : (
            <>
              <IconButton onClick={removeLink}>
                <TrashIcon className="h-5 w-5 text-neutral-500" />
              </IconButton>
              <IconButton onClick={setEditMode}>
                <PencilIcon className="h-5 w-5 text-neutral-500" />
              </IconButton>
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
        <div className="flex gap-2">
          <CopyToClipboard text={shortURL}>
            <IconButton onClick={() => toast(translate.toastURLCopied)}>
              <DocumentDuplicateIcon className="h-5 w-5 text-neutral-500" />
            </IconButton>
          </CopyToClipboard>
          <Link target="_blank" href={shortURL}>
            <IconButton>
              <ArrowTopRightOnSquareIcon className="h-5 w-5 text-neutral-500" />
            </IconButton>
          </Link>
        </div>
      </div>
    </div>
  )
}
