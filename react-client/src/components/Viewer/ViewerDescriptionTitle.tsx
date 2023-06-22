import IconButton from '@/components/Common/IconButton'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useRef, useState } from 'react'
import {
  clearSelectedLink,
  setSelectedLink
} from '@/redux/Slices/selectedLinkSlice'
import toast from 'react-hot-toast'
import { useRemoveLinkMutation, useUpdateLinkMutation } from '@/redux/linksApi'
import { useAppDispatch } from '@/redux/hooks'
import { LinkRecordType } from '@/shared/LinkRecordType'

export default function ViewerDescriptionTitle({
  selectedLink,
  translate
}: {
  selectedLink: LinkRecordType
  translate: { [_: string]: string }
}) {
  const [deleteLink] = useRemoveLinkMutation()
  const [updateLink] = useUpdateLinkMutation()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const [inputValue, setInputValue] = useState<string>('')
  const editInputRef = useRef<HTMLInputElement>(null)
  const dispatch = useAppDispatch()
  const toasterMsgs = {
    loading: translate.toastLoading,
    success: translate.toastSuccess,
    error: translate.toastError
  }

  const removeLink = async () =>
    toast
      .promise(deleteLink(selectedLink.uid).unwrap(), toasterMsgs)
      .then(() => dispatch(clearSelectedLink()))

  const editLink = async () => {
    if (inputValue.length === 0 || inputValue === selectedLink.title) return
    await toast
      .promise(
        updateLink({ uid: selectedLink.uid, title: inputValue }).unwrap(),
        toasterMsgs
      )
      .then(() => {
        dispatch(setSelectedLink({ ...selectedLink, title: inputValue }))
        setIsEdit(false)
      })
  }

  const setEditMode = () => {
    setIsEdit(true)
    setTimeout(() => {
      if (editInputRef.current) editInputRef.current.focus()
    }, 0)
  }

  return (
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
          defaultValue={selectedLink.title}
          className="mr-6 mt-3 h-9 w-full rounded-md border border-gray-300 pl-1 text-3xl font-bold focus:outline-none"
        />
      ) : (
        <p className="mt-3 line-clamp-1 h-9 pb-1 text-3xl font-bold">
          {selectedLink.title}
        </p>
      )}
      <div className="mt-3 flex flex-row items-center gap-2">
        {isEdit ? (
          <>
            <IconButton onClick={editLink}>
              <CheckIcon className="h-5 w-5 text-gray-500" />
            </IconButton>
            <IconButton onClick={() => setIsEdit(false)}>
              <XMarkIcon className="h-5 w-5 text-gray-500" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton onClick={removeLink}>
              <TrashIcon className="h-5 w-5 text-gray-500" />
            </IconButton>
            <IconButton onClick={setEditMode}>
              <PencilIcon className="h-5 w-5 text-gray-500" />
            </IconButton>
          </>
        )}
      </div>
    </div>
  )
}
