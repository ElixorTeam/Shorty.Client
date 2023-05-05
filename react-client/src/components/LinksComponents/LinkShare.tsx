import { useEffect, useRef, useState } from 'react'
import { ShareIcon } from '@heroicons/react/24/outline'
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  VKIcon,
  VKShareButton
} from 'react-share'

export default function LinkShare({ shareLink }: { shareLink: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)}>
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors ease-linear hover:bg-neutral-100 active:bg-neutral-200"
        >
          <ShareIcon className="h-5 w-[20px] text-neutral-500" />
        </button>
      </div>
      {isOpen && (
        <div
          ref={dropdownRef}
          className="absolute right-0 z-10 w-32 list-none rounded-md bg-white py-1 shadow-lg ring-1
               ring-black/[.10] backdrop-blur-md dark:bg-[#2a2633]/[.80] dark:ring-white/[.20]"
        >
          <li>
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700
              hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[.05]"
            >
              <VKShareButton url={shareLink} >
                <div className="flex gap-2">
                  <div className="overflow-hidden rounded">
                    <VKIcon className="h-5 w-5" />
                  </div>
                  <p>Вконтакте</p>
                </div>
              </VKShareButton>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700
              hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[.05]"
            >
              <TelegramShareButton url={shareLink}>
                <div className="flex gap-2">
                  <div className="overflow-hidden rounded">
                    <TelegramIcon className="h-5 w-5" />
                  </div>
                  <p>Telegram</p>
                </div>
              </TelegramShareButton>
            </button>
          </li>
          <li>
            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700
              hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[.05]"
            >
              <FacebookShareButton url={shareLink}>
                <div className="flex gap-2">
                  <div className="overflow-hidden rounded">
                    <FacebookIcon className="h-5 w-5" />
                  </div>
                  <p>Facebook</p>
                </div>
              </FacebookShareButton>
            </button>
          </li>
        </div>
      )}
    </div>
  )
}
