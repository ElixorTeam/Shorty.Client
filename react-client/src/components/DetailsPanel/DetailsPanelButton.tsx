import { ButtonHTMLAttributes, ComponentType } from 'react'

type DetailPanelButtonType = {
  text: string
  Icon: ComponentType<{ className?: string }>
  onClick?: () => void
} & ButtonHTMLAttributes<HTMLButtonElement>

export default function DetailPanelButton({
  text,
  Icon,
  onClick = () => {},
  ...props
}: DetailPanelButtonType) {
  return (
    <div className="flex w-12 flex-col items-center justify-center gap-1">
      <button
        type="button"
        onClick={onClick}
        className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-black/[.1]
         bg-sky-400 shadow transition-colors hover:bg-sky-300"
        {...props}
      >
        <Icon className="h-5 w-5 text-white" />
      </button>
      <p className="line-clamp-1 text-xs font-semibold">{text}</p>
    </div>
  )
}
