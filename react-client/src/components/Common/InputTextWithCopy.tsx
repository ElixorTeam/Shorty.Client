'use client'

import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { InputHTMLAttributes } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'

import IconButton from '@/components/Common/IconButton'

type InputTextWithCopyType = {
  id: string
  value: string
  label: string
} & InputHTMLAttributes<HTMLInputElement>

export default function InputTextWithCopy({
  id,
  value,
  label,
  ...props
}: InputTextWithCopyType) {
  return (
    <div className="w-full">
      <label
        htmlFor={id}
        className="font-semibold text-stone-800 dark:text-gray-300"
      >
        {label}
      </label>
      <div className="mt-1 flex items-center overflow-hidden rounded-lg border bg-white pr-2 dark:border-white/[.15] dark:bg-black">
        <input
          type="text"
          id={id}
          name="link"
          disabled
          className="h-8 w-full border-none bg-transparent px-2 text-sm hover:cursor-text"
          value={value}
          {...props}
        />
        <CopyToClipboard
          text={value}
          onCopy={() => toast.success('The value is copied to the clipboard')}
        >
          <IconButton Icon={ClipboardDocumentIcon} />
        </CopyToClipboard>
      </div>
    </div>
  )
}
