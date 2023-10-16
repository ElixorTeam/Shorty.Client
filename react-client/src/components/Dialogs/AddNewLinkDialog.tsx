'use client'

import { Dialog, Tab, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { Fragment, useState } from 'react'

import GroupLinkForm from '@/components/Forms/GroupLinkForm'
import SingleLinkForm from '@/components/Forms/SingleLinkForm'

export default function AddNewLinkDialog() {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTab, setSelectedTab] = useState(0)
  const tabs = [
    { id: 1, title: 'Single', content: SingleLinkForm },
    { id: 2, title: 'Group', content: GroupLinkForm },
  ]
  const onModalClose = () => {
    setIsOpen(false)
    setSelectedTab(0)
  }

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
        <Dialog as="div" className="relative z-50" onClose={onModalClose}>
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
                  <Tab.Group onChange={setSelectedTab}>
                    <Dialog.Title as="div" className="flex w-full flex-col">
                      <Tab.List className="flex">
                        {tabs.map((item) => (
                          <Tab
                            key={item.id}
                            className={({ selected }) =>
                              clsx(
                                selected &&
                                  'border-b-2 border-b-sky-400 text-sky-400 dark:border-b-sky-400 dark:text-sky-400',
                                'w-full border-b pb-2 text-gray-500 transition hover:border-b-gray-400 hover:text-gray-800 dark:border-b-neutral-500 dark:text-neutral-500 dark:hover:border-b-neutral-400 dark:hover:text-neutral-400'
                              )
                            }
                          >
                            {item.title}
                          </Tab>
                        ))}
                      </Tab.List>
                    </Dialog.Title>
                    <Tab.Panels>
                      {tabs.map((item, index) => (
                        <Tab.Panel key={item.id}>
                          <Transition
                            appear
                            show={selectedTab === index}
                            enter="transition-opacity duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <div className="mt-2 h-full w-full">
                              <item.content closeDialog={onModalClose} />
                            </div>
                          </Transition>
                        </Tab.Panel>
                      ))}
                    </Tab.Panels>
                  </Tab.Group>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
