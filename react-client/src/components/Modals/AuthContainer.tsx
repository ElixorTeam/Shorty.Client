import Link from 'next-intl/link'
import Image from 'next/image'
import { BACKEND_URL } from '@/shared/urls'
import GoogleIcon from '@/public/google.svg'
import GithubIcon from '@/public/github.svg'

export default function AuthContainer({ authText }: { authText: string }) {
  return (
    <div>
      <p className="mb-6 line-clamp-1 w-full text-center text-lg uppercase">
        {authText}
      </p>
      <div className="flex w-full flex-col items-center gap-4 px-5">
        <Link
          href={`${BACKEND_URL}/shorty/oauth2/authorization/google`}
          className="flex h-10 w-full items-center justify-center rounded-lg bg-white align-middle shadow-md transition-colors ease-linear hover:bg-gray-50 dark:hover:bg-gray-200"
        >
          <div className="flex justify-center gap-2">
            <Image src={GoogleIcon} alt="" className="h-6 w-6" />
            <p className="text-black">Google</p>
          </div>
        </Link>
        <Link
          href={`${BACKEND_URL}/shorty/oauth2/authorization/github`}
          className="mb-4 flex h-10 w-full items-center justify-center rounded-lg bg-neutral-700 shadow-md transition-colors ease-linear hover:bg-neutral-500 dark:bg-neutral-800 hover:dark:bg-neutral-700"
        >
          <div className="flex justify-center gap-2">
            <Image src={GithubIcon} alt="" className="h-7 w-7" />
            <p className="pt-[1px] text-white">GitHub</p>
          </div>
        </Link>
      </div>
    </div>
  )
}
