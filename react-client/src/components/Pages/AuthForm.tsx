'use client'

import { useForm } from 'react-hook-form'
import { Link } from 'next-intl'
import { useRouter } from 'next-intl/client'
import GoogleIcon from '@/assets/google-icon.svg'
import GithubIcon from '@/assets/github-icon.svg'
import InputComponent from '@/components/Common/InputComponent'
import toast from 'react-hot-toast'

type FormData = {
  email: string
  password: string
}

export default function AuthForm({
  translate
}: {
  translate: { [_: string]: string }
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()
  const router = useRouter()

  const checkErrors = () => {
    if (errors.email?.type === 'required') toast.error('Email is required')
    else if (errors.email?.type === 'pattern')
      toast.error("Email doesn't follow a pattern")
    else if (errors.password?.type === 'required')
      toast.error('Password is required')
    else if (errors.password?.type === 'pattern')
      toast.error("Password doesn't follow a pattern")
  }

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
          {translate.noAccountText}{' '}
          <Link href="/register" className="text-sky-500">
            {translate.noAccountLink}
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
                name="email"
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
                name="password"
                label={translate.passwordInput}
                registerOptions={{
                  required: true,
                  pattern: /^(?=.*\d)[a-zA-Z\d\W_]{8,}$/
                }}
                register={register}
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={checkErrors}
            className="mt-2 h-10 w-full rounded-lg bg-blue-300 shadow-md shadow-blue-200 transition-colors ease-linear hover:bg-blue-400 dark:shadow-blue-200/[.1]"
          >
            <p className="uppercase text-white">{translate.enterBtn}</p>
          </button>
          <div className="my-4 flex w-full items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:before:border-neutral-600 dark:after:border-neutral-600">
            <p className="mx-4 mb-0 text-center font-semibold uppercase dark:text-white">
              {translate.additionalEnter}
            </p>
          </div>
          <div className="flex w-full flex-row gap-2">
            <button
              type="button"
              className="h-10 w-1/2 justify-center rounded-lg bg-white align-middle shadow-md transition-colors ease-linear hover:bg-gray-50 dark:hover:bg-gray-200"
            >
              <div className="flex justify-center gap-2">
                <GoogleIcon className="h-6 w-6" />
                <p className="text-black">Google</p>
              </div>
            </button>
            <button
              type="button"
              className="h-10 w-1/2 rounded-lg bg-neutral-700 shadow-md transition-colors ease-linear hover:bg-neutral-500 dark:bg-neutral-800 hover:dark:bg-neutral-700"
            >
              <div className="flex justify-center gap-2">
                <GithubIcon className="h-7 w-7 fill-white" />
                <p className="pt-[1px] text-white">GitHub</p>
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
