'use client'

import InputComponent from '@/components/Common/InputComponent'
import { useState } from 'react'
import { FieldErrors, useForm } from 'react-hook-form'
import { useAddLinkMutation } from '@/redux/Api/linksApi'
import { useRouter } from 'next-intl/client'
import toast from 'react-hot-toast'
import { Tooltip } from 'react-tooltip'

type FormInputs = {
  title: string
  externalRef: string
  innerRef: string
}

export default function CreateForm({
  translate
}: {
  translate: { [_: string]: string }
}) {
  const { register, handleSubmit } = useForm<FormInputs>()
  const [isSubmit, setIsSubmit] = useState(false)
  const [addLink] = useAddLinkMutation()
  const router = useRouter()

  const onError = (errors: FieldErrors<FormInputs>) => {
    if (errors.externalRef?.type === 'required')
      toast.error(translate.toastURLRequiredError, {
        id: 'createUrlRequiredError'
      })
    if (errors.externalRef?.type === 'pattern')
      toast.error(translate.toastURLPatternError, {
        id: 'createUrlPatternError'
      })
    if (errors.innerRef?.type === 'pattern')
      toast.error(translate.toastRefPatternError, { id: 'createRefError' })
    if (errors.title?.type === ('maxLength' || 'minLength'))
      toast.error(translate.toastTitlePatternError, { id: 'createTitleError' })
  }

  const onSubmit = async (formInput: FormInputs) => {
    if (isSubmit) return
    setIsSubmit(true)
    await toast
      .promise(
        addLink({
          title: formInput.title,
          externalRef: formInput.externalRef,
          innerRef: formInput.innerRef
        }).unwrap(),
        {
          loading: translate.toastLoading,
          success: translate.toastSuccess,
          error: translate.toastError
        }
      )
      .then(() => {
        setIsSubmit(false)
        router.push('/links')
      })
      .catch(() => setIsSubmit(false))
  }
  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full">
      <div className="my-4 flex flex-col gap-4">
        <div className="w-full">
          <InputComponent
            type="text"
            name="externalRef"
            label={translate.urlLabel}
            registerOptions={{
              required: true,
              pattern:
                /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??#?)?)/
            }}
            register={register}
          />
        </div>
        <div className="flex w-full items-center gap-2">
          <input
            className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm placeholder:text-gray-500
                 dark:border-gray-600 dark:bg-gray-900/[.2]"
            disabled
            placeholder="shr.ty"
          />
          <p className="pb-1 text-xl font-light text-gray-400 dark:text-gray-300">
            /
          </p>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a data-tooltip-id="my-tooltip" className="w-full">
            <InputComponent
              type="text"
              name="innerRef"
              label={`${translate.pathLabel} (${translate.labelOptional})`}
              registerOptions={{
                required: false,
                pattern: /^[a-zA-Z0-9]{3,10}$/
              }}
              register={register}
            />
          </a>
          <Tooltip id="my-tooltip" className="tooltipWrapper">
            <p>{translate.tooltipRefCount}</p>
            <p>{translate.tooltipRefSymbols}</p>
          </Tooltip>
        </div>
        <div className="w-full">
          <InputComponent
            type="text"
            name="title"
            label={`${translate.titleLabel} (${translate.labelOptional})`}
            registerOptions={{
              required: false,
              maxLength: 64,
              minLength: 1
            }}
            register={register}
          />
        </div>
      </div>
      <button
        type="submit"
        className="mt-6 flex h-9 w-full items-center justify-center rounded-lg bg-blue-300 text-sm font-semibold
             uppercase text-white shadow-xl shadow-blue-200 transition-all hover:scale-105 dark:shadow-blue-200/[.1]"
      >
        {translate.submitButton}
      </button>
    </form>
  )
}
