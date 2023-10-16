'use client'

import { PencilIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

type FormValues = {
  newTitle: string
}

export default function PanelTitleInput({ title }: { title: string }) {
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
            value !== title || 'The new name is the same as the old one',
        })}
        defaultValue={title}
        placeholder="Enter title..."
        className="w-full rounded-lg border-black/[.1] p-0 px-2 py-1 text-sm focus:border-black/[.1] focus:ring-0"
      />
      <button type="submit">
        <CheckIcon className="h-4 w-4 text-gray-600 hover:text-gray-800 active:text-black" />
      </button>
      <button type="button" onClick={() => setIsEditMode(false)}>
        <XMarkIcon className="h-4 w-4 text-gray-600 hover:text-gray-800 active:text-black" />
      </button>
    </form>
  ) : (
    <div className="flex w-full items-center justify-center gap-2">
      <p className="line-clamp-1 text-xl">{title}</p>
      <button type="button" onClick={() => setIsEditMode(true)}>
        <PencilIcon className="h-4 w-4 text-gray-600 hover:text-gray-800 active:text-black" />
      </button>
    </div>
  )
}
