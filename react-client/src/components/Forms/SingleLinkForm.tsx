import clsx from 'clsx'
import isUrl from 'is-url-superb'
import { useEffect } from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import ShortURLInputField from '@/components/Forms/ShortURLInputField'

type FormValues = {
  title: string
  link: string
  linkPath: string
  linkPrefix: string
  isPrivate: boolean
  password: string
}

export default function SingleLinkForm({
  closeDialog,
}: {
  closeDialog: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>()

  const watchIsPrivate = watch('isPrivate')
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    closeDialog()
    toast(data.link)
  }

  const onError = (errs: FieldErrors) => {
    Object.entries(errs).forEach((err) => {
      const errMsg = String(err[1]?.message ?? '')
      toast.error(errMsg)
    })
  }

  useEffect(() => {
    if (!watchIsPrivate) {
      setValue('password', '')
    }
  }, [watchIsPrivate, setValue])
  return (
    <form
      className="mt-4 h-full w-full"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <div className="flex h-full w-full flex-col gap-2">
        <label htmlFor="title">
          <p className="text-sm text-gray-700 dark:text-neutral-300">
            Title{' '}
            <span className="text-gray-500 dark:text-neutral-700">
              (optional)
            </span>
          </p>
          <div className="mt-1">
            <input
              id="title"
              type="text"
              {...register('title')}
              className={clsx(
                errors.title && 'border-red-500',
                'h-8 w-full overflow-hidden rounded-lg border border-black/[.2] bg-transparent px-2 text-sm focus:ring-0 dark:border-white/[.15] dark:placeholder:text-neutral-500'
              )}
            />
          </div>
        </label>
        <label htmlFor="link">
          <p className="text-sm text-gray-700 dark:text-neutral-300">Link</p>
          <div className="mt-1">
            <input
              id="link"
              type="text"
              {...register('link', {
                required: { value: true, message: 'Link is required' },
                validate: (value) => isUrl(value) || 'Link must be valid',
              })}
              className={clsx(
                errors.link && 'border-red-500',
                'h-8 w-full overflow-hidden rounded-lg border border-black/[.2] bg-transparent px-2 text-sm focus:outline-none focus:ring-0 dark:border-white/[.15] dark:placeholder:text-neutral-500'
              )}
              placeholder="https://www.example.com"
            />
          </div>
        </label>
        <div className="mt-2 w-full">
          <ShortURLInputField register={register} errors={errors} />
        </div>
        <label htmlFor="password" className="mt-2">
          <p className="text-sm text-gray-700 dark:text-neutral-300">
            Password{' '}
            <span className="text-gray-500 dark:text-neutral-700">
              (optional)
            </span>
          </p>
          <div className="mt-1">
            <input
              id="password"
              type="text"
              disabled={!watchIsPrivate}
              {...register('password', {
                pattern: {
                  value: /^[a-zA-Z0-9]$/,
                  message: 'Password must be valid',
                },
                maxLength: {
                  value: 32,
                  message: 'Password is too long',
                },
                minLength: {
                  value: 1,
                  message: 'Password is too short',
                },
              })}
              className={clsx(
                errors.password && 'border-red-500',
                'h-8 w-full overflow-hidden rounded-lg border border-black/[.2] bg-transparent px-2 text-sm focus:outline-none disabled:bg-gray-100 dark:border-white/[.15] dark:placeholder:text-neutral-500 dark:disabled:bg-neutral-900'
              )}
            />
          </div>
        </label>
        <label
          htmlFor="private"
          className="mt-2 flex flex-row-reverse items-center justify-end gap-2"
        >
          <p className="text-sm text-gray-800 dark:text-neutral-300">Private</p>
          <input
            id="private"
            {...register('isPrivate')}
            type="checkbox"
            className="mt-[1px] h-4 w-4 rounded border-black/[.2] bg-transparent focus:outline-0 focus:ring-0 focus:ring-offset-0 dark:border-white/[.15]"
          />
        </label>
      </div>
      <div className="mt-4 flex justify-end gap-2">
        <button
          type="button"
          onClick={closeDialog}
          className="overflow-hidden rounded-lg border border-black/[.1] px-4 py-2 hover:bg-gray-100 dark:border-white/[.15] dark:hover:bg-neutral-900"
        >
          <p className="text-sm">Cancel</p>
        </button>
        <button
          type="submit"
          className="overflow-hidden rounded-lg border border-black/[.1] bg-sky-400 px-4 py-2 hover:bg-sky-300"
        >
          <p className="text-sm text-white">Create</p>
        </button>
      </div>
    </form>
  )
}
