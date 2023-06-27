'use client'

import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ShareIcon } from '@heroicons/react/24/solid'
import {
  FacebookIcon,
  FacebookShareButton,
  TelegramIcon,
  TelegramShareButton,
  VKIcon,
  VKShareButton
} from 'react-share'
import classNames from '@/utils/classNames'

export default function ShareDropDown({ shareLink }: { shareLink: string }) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button
          className="flex h-9 w-9 items-center justify-center rounded border border-neutral-300 transition-colors
           hover:border-sky-200 hover:bg-sky-100 active:bg-sky-200 dark:border-gray-600 dark:hover:bg-gray-700
            active:dark:bg-gray-700"
        >
          <ShareIcon className="h-5 w-5 text-gray-500" />
        </Menu.Button>
      </div>
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
          <Menu.Item>
            {({ active }) => (
              <VKShareButton url={shareLink} className="w-full">
                <button
                  type="button"
                  className={classNames(
                    active
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-200/[.1] dark:text-sky-300'
                      : 'text-gray-700 dark:text-gray-300',
                    'group flex items-center px-4 py-2 text-sm w-full'
                  )}
                >
                  <VKIcon className="mr-3 h-5 w-5 rounded" />
                  Вконтакте
                </button>
              </VKShareButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <TelegramShareButton url={shareLink} className="w-full">
                <button
                  type="button"
                  className={classNames(
                    active
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-200/[.1] dark:text-sky-300'
                      : 'text-gray-700 dark:text-gray-300',
                    'group flex items-center px-4 py-2 text-sm w-full'
                  )}
                >
                  <TelegramIcon className="mr-3 h-5 w-5 rounded" />
                  Telegram
                </button>
              </TelegramShareButton>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <FacebookShareButton url={shareLink} className="w-full">
                <button
                  type="button"
                  className={classNames(
                    active
                      ? 'bg-sky-50 text-sky-700 dark:bg-sky-200/[.1] dark:text-sky-300'
                      : 'text-gray-700 dark:text-gray-300',
                    'group flex items-center px-4 py-2 text-sm w-full'
                  )}
                >
                  <FacebookIcon className="mr-3 h-5 w-5 rounded" />
                  Facebook
                </button>
              </FacebookShareButton>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
