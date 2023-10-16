'use client'

import { Dialog, Transition } from '@headlessui/react'
import { TrashIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'
import toast from 'react-hot-toast'

import DetailPanelButton from '@/components/DetailsPanel/DetailsPanelButton'

export default function DeleteLinkDialog({ linkUid }: { linkUid: string }) {
  const [isOpen, setIsOpen] = useState(false)
  const handleDeleteClick = () => {
    toast.success(`Link is successfully deleted: ${linkUid}`)
    setIsOpen(false)
  }
  return (
    <>
      <DetailPanelButton
        text="Delete"
        Icon={TrashIcon}
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
                <Dialog.Panel className="w-full max-w-md overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all dark:border dark:border-white/[.15] dark:bg-neutral-950">
                  <Dialog.Title>
                    <p className="mb-3 text-lg font-semibold">Deleting link</p>
                  </Dialog.Title>
                  <p className="mb-4 text-gray-600 dark:text-neutral-500">
                    Are you sure you wont to delete link? All link data will be
                    permanently removed. This action cannot be undone.
                  </p>
                  <div className="flex w-full items-center justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setIsOpen(false)}
                      className="overflow-hidden rounded-lg border border-black/[.1] px-4 py-1 transition-colors hover:bg-gray-100 dark:border-white/[.15] dark:hover:bg-neutral-900"
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteClick}
                      className="overflow-hidden rounded-lg border border-black/[.1] bg-red-500 px-4 py-1 transition-colors hover:bg-red-400"
                    >
                      <p className="text-white">Delete</p>
                    </button>
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
