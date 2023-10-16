'use client'

import { Menu, Transition } from '@headlessui/react'
import { ShareIcon } from '@heroicons/react/24/solid'
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
import { PaperAirplaneIcon } from '@heroicons/react/24/outline'
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
      <Menu.Button>
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
        <Menu.Items
          className="absolute right-0 z-30 mt-2 w-32 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1
           ring-black/[.05] focus:outline-none dark:bg-[#23212e] dark:ring-white/[.1]"
        >
          {items.map((item) => (
            <Menu.Item key={item.id}>
              {({ active }) => (
                <item.Button url={linkUrl} className="w-full">
                  <button
                    type="button"
                    className={clsx(
                      active
                        ? 'bg-sky-50 text-sky-700 dark:bg-sky-200/[.1] dark:text-sky-300'
                        : 'text-gray-700 dark:text-gray-300',
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
