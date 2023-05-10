'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next-intl/client'
import { apiURL } from '@/shared/fetcher'
import ky from 'ky'
import { useSWRConfig } from 'swr'
import toast from 'react-hot-toast'
import InputComponent from '@/components/Common/InputComponent'

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
    if (errors.ref?.type === 'required')
      toast.error(translate.toastURLRequiredError)
    else if (errors.ref?.type === 'pattern')
      toast.error(translate.toastURLPatternError)
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
    <div className="flex h-full w-full flex-col items-center justify-center sm:pb-[64px] sm:pr-[50px] lg:pr-[200px]">
      <div className="w-fit rounded-lg bg-white p-6 shadow-2xl dark:bg-[#23212e] sm:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-64 sm:w-80">
          <p className="w-fit text-2xl font-bold dark:text-white">
            {translate.formTitle}
          </p>
          <div className="my-4 flex flex-col gap-4">
            <div className="w-full">
              <InputComponent
                type="text"
                name="ref"
                label={translate.urlLabel}
                registerOptions={{
                  required: true,
                  pattern:
                    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??#?)?)/
                }}
                register={register}
              />
            </div>
            <div className="w-full">
              <InputComponent
                type="text"
                name="title"
                label={translate.titleLabel}
                registerOptions={{
                  required: false
                }}
                register={register}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={checkErrors}
            className="h-9 w-full rounded-lg bg-blue-300 text-white shadow-xl shadow-blue-200 transition-all
          hover:scale-105 dark:shadow-blue-200/[.1]"
          >
            {translate.submitButton}
          </button>
          {/* <div className="pt-8 text-left"> */}
          {/*  <label htmlFor="ref" className="flex flex-col text-lg"> */}
          {/*    {translate.urlLabel} */}
          {/*    <input */}
          {/*      type="text" */}
          {/*      {...register('ref', { */}
          {/*        required: true, */}
          {/*        pattern: */}
          {/*          /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??#?)?)/ */}
          {/*      })} */}
          {/*      className={`mt-2 h-8 w-full max-w-xs rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white sm:w-72 md:w-full */}
          {/*    ${errors.ref && 'border-2 border-red-500 focus:outline-none'}`} */}
          {/*    /> */}
          {/*  </label> */}
          {/* </div> */}
          {/* <div className="pt-8 text-left"> */}
          {/*  <label htmlFor="title" className="flex flex-col text-lg"> */}
          {/*    {translate.titleLabel} ({translate.labelOptional}) */}
          {/*    <input */}
          {/*      type="text" */}
          {/*      {...register('title')} */}
          {/*      className="mt-2 h-8 w-full max-w-xs rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white sm:w-72 md:w-full" */}
          {/*    /> */}
          {/*  </label> */}
          {/* </div> */}
          {/* <button */}
          {/*  type="submit" */}
          {/*  onClick={checkErrors} */}
          {/*  className="h-7 w-32 rounded-xl bg-blue-300 text-white shadow-xl shadow-blue-200 transition-all */}
          {/* hover:scale-105 dark:shadow-blue-200/[.1]" */}
          {/* > */}
          {/*  {translate.submitButton} */}
          {/* </button> */}
        </form>
      </div>
    </div>
  )
}
