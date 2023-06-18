'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next-intl/client'
import toast from 'react-hot-toast'
import InputComponent from '@/components/Common/InputComponent'
import { useAddLinkMutation } from '@/redux/linksApi'

type FormInputs = {
  title: string
  externalRef: string
  innerRef: string
}

export default function CreateForm({
  translate
}: {
  translate: { [_: string]: string }
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormInputs>()
  const [addLink] = useAddLinkMutation()
  const router = useRouter()

  const checkErrors = () => {
    if (errors.externalRef?.type === 'required')
      toast.error(translate.toastURLRequiredError)
    else if (errors.externalRef?.type === 'pattern')
      toast.error(translate.toastURLPatternError)
  }

  const onSubmit = (formInput: FormInputs) => {
    const formData = {
      title: formInput.title,
      externalRef: formInput.externalRef,
      innerRef: formInput.innerRef
    }
    addLink(formData)
      .unwrap()
      .then(() => {
        router.push('/links')
        toast.success('Success')
      })
      .catch(error => {
        const errResponse: { msg: string } = error.response?.json?.()
        const errMsg = errResponse ? errResponse.msg : error.message
        toast.error(errMsg)
      })
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center sm:pb-[64px] sm:pr-[50px] lg:pr-[200px]">
      <div className="w-fit rounded-2xl bg-white p-6 shadow-2xl dark:bg-[#23212e] sm:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="w-64 sm:w-80">
          <p className="mb-6 w-fit text-2xl font-bold dark:text-white">
            {translate.formTitle}
          </p>
          <div className="my-4 flex flex-col gap-4">
            <div className="w-full">
              <InputComponent
                type="text"
                name="externalRef"
                label={translate.urlLabel}
                registerOptions={{
                  required: true,
                  pattern:
                    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??#?)?)/
                }}
                register={register}
              />
            </div>
            <div className="flex w-full items-center gap-2">
              <input
                className="h-10 w-24 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm placeholder:text-gray-500
                 dark:border-gray-600 dark:bg-gray-900/[.2]"
                disabled
                placeholder="shr.ty"
              />
              <p className="pb-1 text-xl font-light text-gray-400 dark:text-gray-300">
                /
              </p>
              <InputComponent
                type="text"
                name="innerRef"
                label="Path"
                registerOptions={{
                  required: false,
                  pattern: /^[a-zA-Z0-9]{3,10}$/
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
            className="mt-6 flex h-9 w-full items-center justify-center rounded-lg bg-blue-300 text-sm font-semibold
             uppercase text-white shadow-xl shadow-blue-200 transition-all hover:scale-105 dark:shadow-blue-200/[.1]"
          >
            {translate.submitButton}
          </button>
        </form>
      </div>
    </div>
  )
}
