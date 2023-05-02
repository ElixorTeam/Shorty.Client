'use client'

import { useForm } from 'react-hook-form'
import { Link } from 'next-intl'
import { useRouter } from 'next-intl/client'
import InputComponent from '@/components/Common/InputComponent'

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm({
  translate
}: {
  translate: { [_: string]: string }
}) {
  const { register, handleSubmit, getValues } = useForm<FormData>()
  const router = useRouter()
  const onSubmit = (data: FormData) => {
    // eslint-disable-next-line no-console
    console.log(data)
    router.push('/links')
  }
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="flex h-fit w-80 flex-col justify-center rounded-lg p-10 md:w-96 md:shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] dark:md:shadow-gray-900">
        <p className="text-2xl font-bold">{translate.formTitle}</p>
        <p className="mb-1">
          {translate.haveAccountText}{' '}
          <Link href="/auth" className="text-sky-500">
            {translate.haveAccountLink}
          </Link>
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="my-2 flex w-full flex-col justify-center">
            <div className="w-full">
              <InputComponent
                type="email"
                name="regEmailInput"
                label={translate.emailInput}
                registerOptions={{
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                }}
                register={register}
              />
            </div>
            <div className="mt-4 w-full">
              <InputComponent
                type="password"
                name="regPasswordInput"
                label={translate.passwordInput}
                registerOptions={{
                  required: true,
                  pattern: /^(?=.*\d)[a-zA-Z\d\W_]{8,}$/
                }}
                register={register}
              />
            </div>
            <div className="mt-4 w-full">
              <InputComponent
                type="password"
                name="regConfirmPasswordInput"
                label={translate.confirmPasswordInput}
                registerOptions={{
                  required: true,
                  pattern: /^(?=.*\d)[a-zA-Z\d\W_]{8,}$/,
                  validate: value => {
                    const { password } = getValues()
                    return password === value
                  }
                }}
                register={register}
              />
            </div>
          </div>
          <button
            type="submit"
            className="my-2 h-10 w-full rounded-lg bg-blue-300 shadow-md shadow-blue-200 transition-colors ease-linear hover:bg-sky-500 dark:shadow-blue-200/[.1]"
          >
            <p className="text-lg font-semibold text-white">
              {translate.enterBtn}
            </p>
          </button>
        </form>
      </div>
    </div>
  )
}
