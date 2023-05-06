'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next-intl/client'
import { apiURL } from '@/shared/fetcher'
import ky from 'ky'
import { useSWRConfig } from 'swr'
import toast from 'react-hot-toast'

type FormInputs = {
  title: string
  ref: string
}

export default function CreateForm({
  translate
}: {
  translate: { [_: string]: string }
}) {
  const { mutate } = useSWRConfig()
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>()

  const router = useRouter()

  const checkErrors = () => {
    if (errors.ref?.type === 'required') toast.error('URL is required')
    else if (errors.ref?.type === 'pattern')
      toast.error("URL doesn't follow a pattern")
  }

  const onSubmit = async (formInput: FormInputs) => {
    const formData = {
      ref: formInput.ref,
      title: formInput.title,
      active: true
    }
    try {
      await ky.post(`${apiURL}/links/`, { json: formData })
      await mutate(`${apiURL}/links/`)
      router.push('/links')
      toast.success('Success')
    } catch (err: any) {
      const errResponse: { msg: string } = await err.response?.json?.()
      const errMsg = errResponse ? errResponse.msg : err.message
      toast.error(errMsg)
    }
  }

  return (
    <div className="flex h-full w-full flex-col items-center p-4 text-left shadow-[inset_0_0_6px_2px_rgb(0,0,0,0.05)] dark:shadow-[inset_0_0_8px_2px_rgb(0,0,0,0.05)] sm:p-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full sm:w-[300px] md:w-[500px]"
      >
        <p className="text-2xl font-bold dark:text-white">
          {translate.formTitle}
        </p>
        <div className="pt-8 text-left">
          <label htmlFor="ref" className="flex flex-col text-lg">
            {translate.urlLabel}
            <input
              type="text"
              {...register('ref', {
                required: true,
                pattern:
                  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??#?)?)/
              })}
              className={`mt-2 h-8 w-full max-w-xs rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white sm:w-72 md:w-full
              ${errors.ref && 'border-2 border-red-500 focus:outline-none'}`}
            />
          </label>
        </div>
        <div className="pt-8 text-left">
          <label htmlFor="title" className="flex flex-col text-lg">
            {translate.titleLabel} ({translate.labelOptional})
            <input
              type="text"
              {...register('title')}
              className="mt-2 h-8 w-full max-w-xs rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white sm:w-72 md:w-full"
            />
          </label>
        </div>
        <button
          type="submit"
          onClick={checkErrors}
          className="mb-10 mt-8 h-7 w-32 rounded-xl bg-blue-300 text-white shadow-xl shadow-blue-200 transition-all
          hover:scale-105 dark:shadow-blue-200/[.1]"
        >
          {translate.submitButton}
        </button>
      </form>
    </div>
  )
}
