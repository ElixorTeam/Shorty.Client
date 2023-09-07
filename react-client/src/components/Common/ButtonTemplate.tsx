import { ReactNode } from 'react'

export default function ButtonTemplate({
  onClick,
  children,
}: {
  onClick: () => void
  children: ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="transition hover:scale-105 active:scale-95"
    >
      {children}
    </button>
  )
}
