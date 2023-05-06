import { ReactNode } from 'react'

export default function IconButton({
  children,
  onClick
}: {
  onClick?: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors
       ease-linear hover:bg-neutral-100 active:bg-neutral-200 dark:border-neutral-600 dark:hover:bg-neutral-700"
    >
      {children}
    </button>
  )
}

IconButton.defaultProps = {
  onClick: () => {}
}
