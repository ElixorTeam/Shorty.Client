'use client'

import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/solid'
import { Fragment, ReactNode, useRef, useState } from 'react'

export default function AuthDialog({
  children,
  authText,
}: {
  children: ReactNode
  authText: string
}) {
  const [open, setOpen] = useState(false)
  const cancelButtonRef = useRef(null)

  return (
    <>
      <button type="button" onClick={() => setOpen(true)}>
        <p>{authText}</p>
      </button>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <div className="block min-h-screen items-end justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500/[.75] transition-opacity" />
            </Transition.Child>
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="relative my-8 inline-block w-[95%] max-w-sm overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left align-middle shadow-xl transition-all dark:bg-[#32303a] sm:w-full sm:p-6">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="group absolute right-0 top-0 m-5 rounded-md bg-gray-50 transition-colors hover:bg-gray-100 dark:bg-white/[.1]"
                >
                  <XMarkIcon className="m-1 h-5 w-5 text-gray-700 transition-colors group-hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-300" />
                </button>
                {children}
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
