import { ReactNode } from 'react'

export default function IconButton({
  children,
  onClick = () => {}
}: {
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors
       ease-linear hover:border-sky-200 hover:bg-sky-100 active:bg-sky-200 dark:border-gray-600 dark:hover:bg-gray-700 active:dark:bg-gray-700"
    >
      {children}
    </button>
  )
}
