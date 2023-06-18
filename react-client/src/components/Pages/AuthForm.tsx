// import GoogleIcon from '@/assets/google-icon.svg'
// import GithubIcon from '@/assets/github-icon.svg'

export default function AuthForm({
  translate
}: {
  translate: { [_: string]: string }
}) {
  return (
    <div className="flex h-[calc(100vh-64px)] items-center justify-center">
      <div className="flex h-fit w-80 flex-col items-center justify-center rounded-lg p-10 dark:bg-[#23212e] md:w-96 md:shadow-2xl">
        <div className="flex w-full flex-row gap-2">
          <button
            type="button"
            className="h-10 w-1/2 justify-center rounded-lg bg-white align-middle shadow-md transition-colors ease-linear hover:bg-gray-50 dark:hover:bg-gray-200"
          >
            <div className="flex justify-center gap-2">
              {/*<GoogleIcon className="h-6 w-6" />*/}
              <p className="text-black">Google</p>
            </div>
          </button>
          <button
            type="button"
            className="h-10 w-1/2 rounded-lg bg-neutral-700 shadow-md transition-colors ease-linear hover:bg-neutral-500 dark:bg-neutral-800 hover:dark:bg-neutral-700"
          >
            <div className="flex justify-center gap-2">
              {/*<GithubIcon className="h-7 w-7 fill-white" />*/}
              <p className="pt-[1px] text-white">GitHub</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}
