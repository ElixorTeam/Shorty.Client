'use client'

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'

import CreateLinkForm from '@/components/Forms/CreateLinkForm'

export default function AddNewLinkDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex h-8 items-center justify-center overflow-hidden rounded-lg border border-black/[.1] bg-sky-400
         px-4 transition hover:bg-sky-300"
      >
        <p className="text-white">New</p>
      </button>
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
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-gray-900 dark:text-neutral-200"
                  >
                    Create new link
                  </Dialog.Title>
                  <div className="mt-2 h-full w-full">
                    <CreateLinkForm closeDialog={() => setIsOpen(false)} />
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
