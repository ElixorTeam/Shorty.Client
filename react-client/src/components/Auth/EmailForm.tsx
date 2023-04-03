'use client'
import { useForm } from 'react-hook-form'
import GoogleIcon from '@/public/google-icon.svg'
import GithubIcon from '@/public/github-icon.svg'

type FormData = {
  email: string
}

export default function EmailForm({
  onSubmit,
  translate
}: {
  onSubmit: (data: FormData) => void
  translate: { [key: string]: string }
}) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<FormData>()

  const onSubmitHandler = handleSubmit((data: FormData) => {
    onSubmit(data)
  })

  return (
    <form
      onSubmit={onSubmitHandler}
      className="m-auto flex h-max w-2/3 flex-col items-center justify-center rounded-lg p-32"
    >
      <p className=" mb-10 text-4xl font-bold dark:text-white">
        {translate['navBarLogin']}
      </p>
      <div className="mb-10 w-2/3">
        <input
          id="email"
          type="email"
          {...register('email', { required: true })}
          placeholder="example@gmal.com"
          className="h-10 w-full rounded p-5 text-lg text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white"
        />
        {errors.email && (
          <p className="text-red-700">{translate['inputRequired']}</p>
        )}
      </div>
      <button
        type="submit"
        className="h-10 w-2/3 rounded-md bg-gradient-to-tr from-purple-600 to-pink-400 text-lg font-semibold text-white"
      >
        {translate['authEnterSubmit']}
      </button>
      <div className="mt-2 flex w-11/12 flex-row justify-between space-x-4">
        <button type="button" className="bg-white">
          <GoogleIcon className="h-5 w-5" />
          <p className="mb-[2px] text-black">Google</p>
        </button>
        <button type="button" className="bg-neutral-800">
          <GithubIcon className="h-5 w-5 fill-white" />
          <p className="text-white">GitHub</p>
        </button>
      </div>
    </form>
  )
}
