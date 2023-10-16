'use client'

import { CheckIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type FormValues = {
  newTitle: string
}

export default function PanelTagInput({ tag }: { tag: string }) {
  const { register, handleSubmit } = useForm<FormValues>()
  const [isEditMode, setIsEditMode] = useState(false)
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    setIsEditMode(false)
    toast.success(`Title has been changed: ${data.newTitle}`)
  }

  const onError = (errs: FieldErrors) => {
    Object.entries(errs).forEach((err) => {
      const errMsg = String(err[1]?.message ?? '')
      toast.error(errMsg)
    })
  }

  return isEditMode ? (
    <form
      onSubmit={handleSubmit(onSubmit, onError)}
      className="flex h-8 w-full max-w-[12rem] items-center justify-center gap-2 overflow-hidden"
    >
      <input
        type="text"
        {...register('newTitle', {
          required: {
            value: true,
            message: 'Please enter title or press cancel',
          },
          validate: (value) =>
            value !== tag || 'The new name is the same as the old one',
        })}
        defaultValue={tag}
        className="w-full border-0 border-b border-b-black/[.1] p-0 pb-[2px] text-sm focus:border-b-black/[.1] focus:ring-0"
      />
      <button type="button" onClick={() => setIsEditMode(false)}>
        <CheckIcon className="h-4 w-4 text-gray-600 hover:text-gray-800 active:text-black" />
      </button>
      <button type="button" onClick={() => setIsEditMode(false)}>
        <XMarkIcon className="h-4 w-4 text-gray-600 hover:text-gray-800 active:text-black" />
      </button>
    </form>
  ) : (
    <div className="flex w-full items-center justify-center gap-1">
      <div className="overflow-hidden rounded-2xl border border-black/[.2] bg-gray-200 px-3 py-1">
        <p className="text-sm">{tag}</p>
      </div>
      <button type="button" onClick={() => setIsEditMode(true)}>
        <PencilIcon className="h-4 w-4 text-gray-600 hover:text-gray-800 active:text-black" />
      </button>
    </div>
  )
}
