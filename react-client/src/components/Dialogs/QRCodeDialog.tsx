'use client'

import { Dialog, Transition } from '@headlessui/react'
import { QrCodeIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'

import DetailPanelButton from '@/components/DetailsPanel/DetailsPanelButton'
import QRGenerator from '@/components/QRGenerator'

export default function QRCodeDialog({ linkUrl }: { linkUrl: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <DetailPanelButton
        text="QR Code"
        Icon={QrCodeIcon}
        onClick={() => setIsOpen(true)}
      />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50"
          onClose={() => setIsOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/[.2] dark:bg-black/[.5]" />
          </Transition.Child>
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-xs overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-white/[.15] dark:bg-neutral-950">
                  <Dialog.Title className="flex items-center justify-between">
                    <p className="text-lg font-semibold">QR Code</p>
                    <button type="button" onClick={() => setIsOpen(false)}>
                      <XMarkIcon className="h-4 w-4 text-gray-600 hover:text-gray-800 active:text-black" />
                    </button>
                  </Dialog.Title>
                  <div className="flex h-full w-full items-center justify-center">
                    <QRGenerator text={linkUrl} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
