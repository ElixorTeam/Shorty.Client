'use client'

import { ReactNode, useState } from 'react'
import { ShareIcon } from '@heroicons/react/24/outline'
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  VKIcon,
  VKShareButton
} from 'react-share'
import DropdownMenu from '@/components/Common/DropdownMenu'
import IconButton from '@/components/Common/IconButton'

function LinkShareButton({ children }: { children: ReactNode }) {
  return (
    <li>
      <button
        type="button"
        className="block w-full px-4 py-2 text-left text-sm leading-5 text-gray-700
              hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-white/[.05]"
      >
        {children}
      </button>
    </li>
  )
}

export default function LinkShare({ shareLink }: { shareLink: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <div className="relative inline-block" onMouseEnter={() => setIsOpen(true)}>
      <div>
        <IconButton onClick={() => setIsOpen(true)}>
          <ShareIcon className="h-5 w-5 text-gray-500" />
        </IconButton>
      </div>
      <DropdownMenu isOpen={isOpen} setIsOpen={statue => setIsOpen(statue)}>
        <LinkShareButton>
          <VKShareButton url={shareLink}>
            <div className="flex gap-2">
              <div className="overflow-hidden rounded">
                <VKIcon className="h-5 w-5" />
              </div>
              <p>Вконтакте</p>
            </div>
          </VKShareButton>
        </LinkShareButton>
        <LinkShareButton>
          <TelegramShareButton url={shareLink}>
            <div className="flex gap-2">
              <div className="overflow-hidden rounded">
                <TelegramIcon className="h-5 w-5" />
              </div>
              <p>Telegram</p>
            </div>
          </TelegramShareButton>
        </LinkShareButton>
        <LinkShareButton>
          <FacebookShareButton url={shareLink}>
            <div className="flex gap-2">
              <div className="overflow-hidden rounded">
                <FacebookIcon className="h-5 w-5" />
              </div>
              <p>Facebook</p>
            </div>
          </FacebookShareButton>
        </LinkShareButton>
      </DropdownMenu>
    </div>
  )
}
