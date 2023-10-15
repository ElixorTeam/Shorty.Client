import clsx from 'clsx'
import { KeyboardEvent, useState } from 'react'
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import LinkListForm from '@/components/Forms/LinkListForm'
import LinkPrefixPathInputField from '@/components/Forms/LinkPrefixPathInputField'

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
    if (links.length === 0) {
      toast.error('Should be at least 1 link')
      return
    }
    const numberedLinks = links.map((link, index) => `${index + 1}. ${link}`)
    const basicLink = data.linkPrefix ? `${data.linkPrefix}.sh0.su` : 'sh0.su'
    const finalLink = `${basicLink}/${data.linkPath}`
    toast(`title: ${data.title}\nshort: ${finalLink}\n links:${numberedLinks}`)
    closeDialog()
  }

  const onError = (errs: FieldErrors) => {
    Object.entries(errs).forEach((err) => {
      const errMsg = String(err[1]?.message ?? '')
      toast.error(errMsg)
    })
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLFormElement>) => {
    if (event.key === 'Enter') event.preventDefault()
  }
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <form
      className="mt-4 h-full w-full"
      onSubmit={handleSubmit(onSubmit, onError)}
      onKeyDown={handleKeyDown}
    >
      <div className="flex h-full w-full flex-col gap-4">
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
        <LinkListForm links={links} setLinks={setLinks} />
        <LinkPrefixPathInputField register={register} errors={errors} />
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
