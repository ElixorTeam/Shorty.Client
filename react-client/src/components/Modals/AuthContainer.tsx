import GoogleIcon from '@/assets/google-icon.svg'
import GithubIcon from '@/assets/github-icon.svg'

export default function AuthContainer({ authText }: { authText: string }) {
  return (
    <div>
      <p className="mb-6 line-clamp-1 w-full text-center text-lg uppercase">
        {authText}
      </p>
      <div className="flex w-full flex-col items-center gap-4 px-5">
        <button
          type="button"
          className="h-10 w-full justify-center rounded-lg bg-white align-middle shadow-md transition-colors ease-linear hover:bg-gray-50 dark:hover:bg-gray-200"
        >
          <div className="flex justify-center gap-2">
            <GoogleIcon className="h-6 w-6" />
            <p className="text-black">Google</p>
          </div>
        </button>
        <button
          type="button"
          className="mb-4 h-10 w-full rounded-lg bg-neutral-700 shadow-md transition-colors ease-linear hover:bg-neutral-500 dark:bg-neutral-800 hover:dark:bg-neutral-700"
        >
          <div className="flex justify-center gap-2">
            <GithubIcon className="h-7 w-7 fill-white" />
            <p className="pt-[1px] text-white">GitHub</p>
          </div>
        </button>
      </div>
    </div>
  )
}
