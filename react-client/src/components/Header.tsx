import ThemeSwitcher from '@/components/Common/ThemeSwitcher'

export default function Header() {
  return (
    <header className="sticky top-0 z-40 flex h-16 w-full shrink-0 items-center border-b bg-white/[.5] px-10 backdrop-blur-md dark:border-b-white/[.15] dark:bg-black/[.3]">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
        <a href="/">
          <p className="text-4xl font-extrabold">Shorty</p>
        </a>
        <div className="flex items-center gap-4">
          <ThemeSwitcher />
          <button
            type="button"
            className="rounded-3xl border from-white to-gray-100 px-4 py-1 hover:bg-gradient-to-br dark:border-white/[.3] dark:from-neutral-800 dark:to-black"
          >
            <p className="uppercase">Sign up</p>
          </button>
        </div>
      </div>
    </header>
  )
}
