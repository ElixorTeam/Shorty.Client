'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next-intl/client'
import { useState } from 'react'
import { apiURL } from '@/shared/fetcher'
import ky from 'ky'
import { useSWRConfig } from 'swr'

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
  const [requestError, setRequestError] = useState<string | null>(null)
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>()

  const router = useRouter()

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
    } catch (err: any) {
      const errResponse: { msg: string } = await err.response?.json?.()
      const errMsg = errResponse ? errResponse.msg : err.message
      setRequestError(errMsg)
    }
  }

  return (
    <div className="flex justify-center px-8 pt-8 text-left">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[300px] md:w-[500px]"
      >
        <p className="text-2xl font-bold dark:text-white">
          {translate.formTitle}
        </p>
        {requestError ? (
          <p className="mt-4 text-red-500">{requestError}</p>
        ) : null}
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
              className={`mt-2 h-8 w-72 rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white md:w-full
              ${errors.ref && 'border-2 border-red-500 focus:outline-none'}`}
            />
          </label>
          {errors.ref?.type === 'required' && (
            <span className="text-red-500">{translate.urlErrorRequired}</span>
          )}
          {errors.ref?.type === 'pattern' && (
            <span className="text-red-500">{translate.urlErrorPattern}</span>
          )}
        </div>
        <div className="pt-8 text-left">
          <label htmlFor="title" className="flex flex-col text-lg">
            {translate.titleLabel} ({translate.labelOptional})
            <input
              type="text"
              {...register('title')}
              className="mt-2 h-8 w-72 rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white md:w-full"
            />
          </label>
        </div>
        <div className="pt-8 text-left">
          {/* <label htmlFor="custom" className="flex flex-col text-lg"> */}
          {/*  {translate['customLabel']} ({translate['labelOptional']}) */}
          {/*  <div className="mt-2 flex flex-row items-center space-x-5"> */}
          {/*    <div className="flex h-8 w-24 items-center justify-center rounded ring-1 ring-gray-400/[.40] dark:bg-black/[.20]"> */}
          {/*      <p className="text-gray-700">sh0.ty</p> */}
          {/*    </div> */}
          {/*    <p className="text-2xl">/</p> */}
          {/*    <input */}
          {/*      type="text" */}
          {/*      {...register('custom', { */}
          {/*        pattern: /^[a-zA-Z0-9]+$/ */}
          {/*      })} */}
          {/*      className={`h-8 w-36 rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white ${ */}
          {/*        errors.custom && 'border-2 border-red-500 focus:outline-none' */}
          {/*      }`} */}
          {/*    /> */}
          {/*    {errors.custom?.type === 'pattern' && ( */}
          {/*      <span className="text-red-500"> */}
          {/*        {translate['customErrorPattern']} */}
          {/*      </span> */}
          {/*    )} */}
          {/*  </div> */}
          {/* </label> */}
        </div>
        <button
          type="submit"
          className="mb-10 mt-8 h-7 w-32 rounded-xl bg-blue-300 text-white shadow-xl shadow-blue-200 transition-all
          hover:scale-105 dark:shadow-blue-200/[.1]"
        >
          {translate.submitButton}
        </button>
      </form>
    </div>
  )
}
