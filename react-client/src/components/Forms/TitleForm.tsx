import { useEffect, useState } from 'react'
import IconButton from '@/components/Common/IconButton'
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/solid'
import toast from 'react-hot-toast'
import { setSelectedLink } from '@/redux/Slices/selectedLinkSlice'
import { useUpdateLinkMutation } from '@/redux/Api/linksApi'
import { useAppDispatch } from '@/redux/hooks'
import { LinkRecordType } from '@/shared/LinkRecordType'
import { FieldErrors, useForm } from 'react-hook-form'

type FormInput = {
  title: string
}

export default function TitleForm({
  closeSetMode,
  selectedLink,
  translate
}: {
  closeSetMode: () => void
  selectedLink: LinkRecordType
  translate: { [_: string]: string }
}) {
  const { register, handleSubmit, setFocus } = useForm<FormInput>({
    defaultValues: {
      title: selectedLink.title
    }
  })
  const [updateLink] = useUpdateLinkMutation()
  const [isSubmit, setIsSubmit] = useState(false)
  const dispatch = useAppDispatch()
  const onError = (errors: FieldErrors<FormInput>) => {
    if (
      ['maxLength', 'minLength', 'required'].includes(
        errors.title?.type as string
      )
    )
      toast.error(translate.toastTitleError, { id: 'toastTitleError' })
  }
  const onSubmit = async (formInput: FormInput) => {
    if (isSubmit) return
    if (formInput.title === selectedLink.title) {
      closeSetMode()
      return
    }
    setIsSubmit(true)
    await toast
      .promise(
        updateLink({ uid: selectedLink.uid, title: formInput.title }).unwrap(),
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
        { id: 'titleEditToast' }
      )
      .then(() => {
        dispatch(setSelectedLink({ ...selectedLink, title: formInput.title }))
        setIsSubmit(false)
        closeSetMode()
      })
      .catch(() => setIsSubmit(false))
  }
  useEffect(() => setFocus('title'), [setFocus])
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') handleSubmit(onSubmit, onError)()
      else if (event.key === 'Escape') closeSetMode()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <form
      className="flex w-full flex-row"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <input
        type="text"
        maxLength={64}
        {...register('title', { required: true, maxLength: 64, minLength: 1 })}
        className="mr-6 mt-3 h-9 w-full rounded-md border border-gray-300 pl-1 text-3xl font-bold focus:outline-none"
      />
      <div className="mt-3 flex flex-row items-center gap-2">
        <IconButton type="submit">
          <CheckIcon className="h-5 w-5 text-gray-500" />
        </IconButton>
        <IconButton onClick={() => closeSetMode()}>
          <XMarkIcon className="h-5 w-5 text-gray-500" />
        </IconButton>
      </div>
    </form>
  )
}
