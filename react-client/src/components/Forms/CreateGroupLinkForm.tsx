import clsx from 'clsx'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import LinkListForm from '@/components/Forms/LinkListForm'

type FormValues = {
  title: string
  linkPath: string
  linkPrefix: string
}

export default function CreateGroupLinkForm({
  closeDialog,
}: {
  closeDialog: () => void
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>()

  const [links, setLinks] = useState<string[]>([])

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    closeDialog()
  }

  const addLink = (url: string) => setLinks([...links, url])

  const onError = (errs: FieldErrors) => {
    Object.entries(errs).forEach((err) => {
      const errMsg = String(err[1]?.message ?? '')
      toast.error(errMsg)
    })
  }
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
        <div className="mt-2 w-full">
          <LinkListForm />
        </div>
        <div className="mt-2 w-full">
          <div className="mb-1 flex w-full">
            <p className="line-clamp-1 w-full text-sm text-gray-700 dark:text-neutral-300">
              Prefix{' '}
              <span className="text-gray-500 dark:text-neutral-700">
                (optional)
              </span>
            </p>
            <p className="line-clamp-1 w-full pl-14 text-sm text-gray-700 dark:text-neutral-300">
              Path{' '}
              <span className="text-gray-500 dark:text-neutral-700">
                (optional)
              </span>
            </p>
          </div>
          <div
            className={clsx(
              (errors.linkPrefix || errors.linkPath) && 'border-red-500',
              'flex h-8 items-center rounded-lg border border-black/[.2] dark:border-white/[.2]'
            )}
          >
            <input
              type="text"
              {...register('linkPrefix')}
              className="h-full w-full border-none bg-transparent px-2 text-sm focus:outline-none focus:ring-0 dark:placeholder:text-neutral-500"
            />
            <div className="flex h-full items-center border-x border-x-black/[.2] bg-gray-100 px-4 dark:border-x-white/[.2] dark:bg-neutral-900 dark:text-neutral-300">
              <p className="text-sm">.sh0.su/</p>
            </div>
            <input
              type="text"
              {...register('linkPath')}
              className="h-full w-full border-none bg-transparent px-2 text-sm focus:outline-none focus:ring-0 dark:placeholder:text-neutral-500"
            />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          type="button"
          onClick={closeDialog}
          className="overflow-hidden rounded-lg border border-black/[.1] px-4 py-2 hover:bg-gray-100 dark:border-white/[.2] dark:hover:bg-neutral-900"
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
