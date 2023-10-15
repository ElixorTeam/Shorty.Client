import clsx from 'clsx'
import { FieldErrors, UseFormRegister } from 'react-hook-form'

export default function LinkPrefixPathInputField({
  register,
  errors,
}: {
  register: UseFormRegister<any>
  errors: FieldErrors
}) {
  return (
    <div className="w-full">
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
          'flex h-8 items-center rounded-lg border border-black/[.2] dark:border-white/[.15]'
        )}
      >
        <input
          type="text"
          {...register('linkPrefix', {
            pattern: {
              value: /^[a-zA-Z0-9]$/,
              message: 'Prefix must be valid',
            },
            maxLength: {
              value: 16,
              message: 'Prefix is too long',
            },
            minLength: {
              value: 1,
              message: 'Prefix is too short',
            },
          })}
          className="h-full w-full border-none bg-transparent px-2 text-sm focus:outline-none focus:ring-0 dark:placeholder:text-neutral-500"
        />
        <div className="flex h-full items-center border-x border-x-black/[.2] bg-gray-100 px-4 dark:border-x-white/[.15] dark:bg-neutral-900 dark:text-neutral-300">
          <p className="text-sm">.sh0.su/</p>
        </div>
        <input
          type="text"
          {...register('linkPath', {
            pattern: {
              value: /^[a-zA-Z0-9]$/,
              message: 'Path must be valid',
            },
            maxLength: {
              value: 16,
              message: 'Path is too long',
            },
            minLength: {
              value: 1,
              message: 'Path is too short',
            },
          })}
          className="h-full w-full border-none bg-transparent px-2 text-sm focus:outline-none focus:ring-0 dark:placeholder:text-neutral-500"
        />
      </div>
    </div>
  )
}
