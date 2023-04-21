'use client'
import { useForm } from 'react-hook-form'
import { Link } from 'next-intl'
import { useRouter } from 'next-intl/client'

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues
  } = useForm<FormData>()
  const router = useRouter()
  const onSubmit = (data: FormData) => {
    console.log(data)
    router.push('/links')
  }
  return (
    <div className="flex h-[calc(100vh-64px)] flex-col justify-center align-middle">
      <div>
        <p className="mb-2 text-center text-4xl font-bold dark:text-white">
          Create new account
        </p>
        <p className="mb-2 text-center">
          If you have account, than{' '}
          <Link href={'/auth'} className="text-sky-300">
            login in
          </Link>
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="m-auto flex h-max w-[300px] flex-col items-center justify-center rounded-lg md:w-[500px]"
        >
          <div className="my-2 flex w-3/4 flex-col justify-center">
            <label
              htmlFor="email"
              className="flex w-full flex-col justify-center text-lg"
            >
              E-mail
              <input
                id="email"
                type="email"
                {...register('email', {
                  required: true,
                  pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
                })}
                placeholder="example@gmail.com"
                className={`mt-2 h-8 w-full rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white
              ${errors.email && 'border-2 border-red-500 focus:outline-none'}`}
              />
            </label>
            {errors.email?.type === 'required' && (
              <span className="text-red-500">Input required</span>
            )}
            {errors.email?.type === 'pattern' && (
              <span className="text-red-500">Invalid e-mail address</span>
            )}
          </div>
          <div className="my-2 flex w-3/4 flex-col justify-center">
            <label
              htmlFor="password"
              className="flex w-full flex-col justify-center text-lg"
            >
              Password
              <input
                id="password"
                type="password"
                {...register('password', {
                  required: true,
                  pattern: /^(?=.*\d)[a-zA-Z\d\W_]{8,}$/
                })}
                placeholder="********"
                className={`mt-2 h-8 w-full rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white
              ${
                errors.password && 'border-2 border-red-500 focus:outline-none'
              }`}
              />
            </label>
            {errors.password?.type === 'required' && (
              <span className="text-red-500">Input required</span>
            )}
            {errors.password?.type === 'pattern' && (
              <span className="text-red-500">Doesnt consist to pattern</span>
            )}
          </div>
          <div className="my-2 flex w-3/4 flex-col justify-center">
            <label
              htmlFor="password"
              className="flex w-full flex-col justify-center text-lg"
            >
              Confirm Password
              <input
                id="confirmPassword"
                type="password"
                {...register('confirmPassword', {
                  required: true,
                  validate: value => {
                    const { password } = getValues()
                    return password === value || 'Passwords should match'
                  }
                })}
                placeholder="********"
                className={`mt-2 h-8 w-full rounded px-2 text-sm text-black ring-1 ring-gray-400/[.40] dark:bg-black/[.20] dark:text-white
              ${
                errors.confirmPassword &&
                'border-2 border-red-500 focus:outline-none'
              }`}
              />
            </label>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
          <button
            type="submit"
            className="mb-2 mt-6 h-10 w-[300px] rounded-lg bg-blue-300 shadow-md shadow-blue-200 transition hover:scale-105 dark:shadow-blue-200/[.1]"
          >
            <p className="text-lg font-semibold text-white">Create account</p>
          </button>
        </form>
      </div>
    </div>
  )
}
