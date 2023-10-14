import clsx from 'clsx'
import { useEffect } from 'react'
import { FieldErrors, Resolver, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import isURL from 'validator/lib/isURL'

type ValueError = {
  type: string
  message: string
}

type FormValues = {
  title: string
  link: string
  linkPath: string
  linkPrefix: string
  isPrivate: boolean
  password: string
}

type FormErrors = {
  link?: ValueError
  linkPath?: ValueError
  linkPrefix?: ValueError
  password?: ValueError
}

const resolver: Resolver<FormValues> = async (values) => {
  const errors: FormErrors = {}

  if (!values.link || !isURL(values.link)) {
    errors.link = {
      type: 'required',
      message: 'Link is required and must be a valid URL.',
    }
  }

  if (values.linkPath && !/^[a-zA-Z0-9]{1,16}$/.test(values.linkPath)) {
    errors.linkPath = {
      type: 'pattern',
      message:
        'Link Path can only contain alphanumeric characters and be up to 16 characters long.',
    }
  }

  if (values.linkPrefix && !/^[a-zA-Z0-9]{1,16}$/.test(values.linkPrefix)) {
    errors.linkPrefix = {
      type: 'pattern',
      message:
        'Link Prefix can only contain alphanumeric characters and be up to 16 characters long.',
    }
  }

  if (values.password && !/^[a-zA-Z0-9]{1,64}$/.test(values.password)) {
    errors.password = {
      type: 'pattern',
      message:
        'Password can only contain alphanumeric characters and be up to 64 characters long.',
    }
  }

  return {
    values: Object.keys(errors).length ? {} : values,
    errors,
  }
}

export default function CreateSingleLinkForm({
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
  } = useForm<FormValues>({ resolver })

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
              {...register('link')}
              className={clsx(
                errors.link && 'border-red-500',
                'h-8 w-full overflow-hidden rounded-lg border border-black/[.2] bg-transparent px-2 text-sm focus:outline-none focus:ring-0 dark:border-white/[.15] dark:placeholder:text-neutral-500'
              )}
              placeholder="https://www.example.com"
            />
          </div>
        </label>
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
              {...register('password')}
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
            className="mt-[1px] h-4 w-4 rounded border-black/[.2] bg-transparent focus:outline-0 focus:ring-0 focus:ring-offset-0 dark:border-white/[.2]"
          />
        </label>
      </div>
      <div className="mt-4 flex justify-end gap-2">
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
