import IconButton from '@/components/Common/IconButton'
import { PencilIcon, TrashIcon } from '@heroicons/react/24/outline'
import React, { useState } from 'react'
import { clearSelectedLink } from '@/redux/Slices/selectedLinkSlice'
import toast from 'react-hot-toast'
import { useRemoveLinkMutation } from '@/redux/Api/linksApi'
import { useAppDispatch } from '@/redux/hooks'
import { LinkRecordType } from '@/shared/LinkRecordType'
import TitleForm from '@/components/Forms/TitleForm'

export default function ViewerDescriptionTitle({
  selectedLink,
  translate
}: {
  selectedLink: LinkRecordType
  translate: { [_: string]: string }
}) {
  const [deleteLink] = useRemoveLinkMutation()
  const [isEdit, setIsEdit] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const removeLink = async () =>
    toast
      .promise(
        deleteLink(selectedLink.uid).unwrap(),
        {
          loading: translate.toastLoading,
          success: translate.toastSuccess,
          error: err => {
            const errMsg = err.data.error
            const toastMsg = translate[err.data.error]
            if (errMsg && toastMsg && toastMsg !== `app.${errMsg}`)
              return toastMsg
            return translate.toastError
          }
        },
        { id: 'deleteLinkToast' }
      )
      .then(() => dispatch(clearSelectedLink()))

  return (
    <div className="flex h-12 items-start justify-between">
      {isEdit ? (
        <TitleForm
          closeSetMode={() => setIsEdit(false)}
          selectedLink={selectedLink}
          translate={translate}
        />
      ) : (
        <>
          <p className="mt-3 line-clamp-1 h-9 break-all pb-1 pr-3 text-3xl font-bold">
            {selectedLink.title}
          </p>
          <div className="mt-3 flex flex-row items-center gap-2">
            <IconButton onClick={removeLink}>
              <TrashIcon className="h-5 w-5 text-gray-500" />
            </IconButton>
            <IconButton onClick={() => setIsEdit(true)}>
              <PencilIcon className="h-5 w-5 text-gray-500" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  )
}
