import {
  ClipboardDocumentIcon,
  PaperAirplaneIcon,
  QrCodeIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import { ComponentType } from 'react'

import avatar_artyom from '@/public/avatar_artyom.jpg'

function ProjectButton({
  text,
  Icon,
}: {
  text: string
  Icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex w-12 flex-col items-center justify-center gap-1">
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-black/[.1]
         bg-sky-400 shadow transition-colors hover:bg-sky-300"
      >
        <Icon className="h-5 w-5 text-white" />
      </button>
      <p className="line-clamp-1 text-xs font-semibold">{text}</p>
    </div>
  )
}

function InputText({
  id,
  value,
  label,
}: {
  id: string
  value: string
  label: string
}) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="font-semibold text-stone-800 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="mt-1 flex items-center overflow-hidden rounded-lg border bg-white dark:border-white/[.2] dark:bg-black">
        <input
          type="text"
          id={id}
          name="link"
          disabled
          className="h-8 w-full bg-transparent px-2 hover:cursor-text"
          value={value}
        />
        <ClipboardDocumentIcon className="mr-2 h-5 w-5 text-gray-700 hover:text-black" />
      </div>
    </div>
  )
}

export default function DetailsPanel() {
  const buttons = [
    { id: 1, title: 'QR', icon: QrCodeIcon },
    { id: 2, title: 'Share', icon: PaperAirplaneIcon },
    { id: 3, title: 'Delete', icon: TrashIcon },
  ]
  return (
    <div className="h-full w-full pt-5">
      <div className="flex w-full flex-col items-center gap-2">
        <div className="h-24 w-24 overflow-hidden rounded-full">
          <Image
            src={avatar_artyom.src}
            width={avatar_artyom.width}
            height={avatar_artyom.height}
            alt=""
            className="h-full w-full"
          />
        </div>
        <p className="text-xl">Youtube Channel</p>
      </div>
      <ul className="mt-4 flex flex-row items-center justify-center gap-5">
        {buttons.map((item) => (
          <li key={item.id}>
            <ProjectButton text={item.title} Icon={item.icon} />
          </li>
        ))}
      </ul>
      <div className="mt-4 flex w-full items-center justify-center px-4">
        <div className="flex w-full max-w-sm flex-col gap-8">
          <InputText
            id="shortedVersion"
            value="https://www.sh0.su/fX6bg"
            label="Link"
          />
          <InputText
            id="originalVersion"
            value="https://www.youtube.com/c/Ap73MKa"
            label="Original"
          />
        </div>
      </div>
    </div>
  )
}
