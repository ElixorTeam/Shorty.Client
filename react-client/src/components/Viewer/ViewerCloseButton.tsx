'use client'

import { clearSelectedLink } from '@/redux/Slices/selectedLinkSlice'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { useAppDispatch } from '@/redux/hooks'

export default function ViewerCloseButton() {
  const dispatch = useAppDispatch()
  return (
    <button type="button" onClick={() => dispatch(clearSelectedLink())}>
      <XMarkIcon className="h-6 w-6 dark:text-white" />
    </button>
  )
}
