'use client'

import { Menu, Transition } from '@headlessui/react'
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
import clsx from 'clsx'
import { Fragment } from 'react'
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  VKIcon,
  VKShareButton,
} from 'react-share'

import DetailPanelButton from '@/components/DetailsPanel/DetailsPanelButton'

export default function ShareLinkMenu({ linkUrl }: { linkUrl: string }) {
  const items = [
    { id: 1, title: 'Vk', Button: VKShareButton, Icon: VKIcon },
    {
      id: 2,
      title: 'Telegram',
      Button: TelegramShareButton,
      Icon: TelegramIcon,
    },
    {
      id: 3,
      title: 'Facebook',
      Button: FacebookShareButton,
      Icon: FacebookIcon,
    },
  ]
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button as="div">
        <DetailPanelButton Icon={PaperAirplaneIcon} text="Share" />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute -right-10 z-30 mt-2 w-32 rounded-lg border border-black/[.1] bg-gray-50 py-1 shadow-lg dark:border-white/[.15] dark:bg-neutral-950">
          {items.map((item) => (
            <Menu.Item key={item.id}>
              {({ active }) => (
                <item.Button url={linkUrl} className="w-full">
                  <button
                    type="button"
                    className={clsx(
                      active
                        ? 'bg-gray-200 text-black dark:bg-neutral-900 dark:text-neutral-200'
                        : 'text-gray-700 dark:text-neutral-400',
                      'group flex w-full items-center px-4 py-2 text-sm'
                    )}
                  >
                    <item.Icon className="mr-3 h-5 w-5 rounded" />
                    {item.title}
                  </button>
                </item.Button>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
