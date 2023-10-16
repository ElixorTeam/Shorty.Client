'use client'

import { ClipboardDocumentIcon } from '@heroicons/react/24/outline'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import toast from 'react-hot-toast'

export default function InputTextWithCopy({
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
      <div className="mt-1 flex items-center overflow-hidden rounded-lg border bg-white dark:border-white/[.15] dark:bg-black">
        <input
          type="text"
          id={id}
          name="link"
          disabled
          className="h-8 w-full border-none bg-transparent px-2 text-sm hover:cursor-text"
          value={value}
        />
        <CopyToClipboard
          text={value}
          onCopy={() => toast.success('The value is copied to the clipboard')}
        >
          <ClipboardDocumentIcon className="mr-2 h-5 w-5 cursor-pointer text-gray-700 hover:text-black dark:text-neutral-300 dark:hover:text-neutral-200 dark:active:text-white" />
        </CopyToClipboard>
      </div>
    </div>
  )
}
