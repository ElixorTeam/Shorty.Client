'use client'

import {
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
  QrCodeIcon,
  PaperAirplaneIcon,
  TrashIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { VKIcon } from 'react-share'

import DevicesChart from '@/components/Charts/DevicesChart'
import WeekLineChart from '@/components/Charts/WeekLineChart'

export default function AppPage() {
  const links = Array.from(Array(10).keys())
  return (
    <div className="relative h-full w-full bg-white/[.6]">
      <div className="h-full w-full">
        <div className="grid h-full w-full grid-cols-[14rem,1fr] grid-rows-1 lg:grid-cols-[18rem,1fr]">
          <nav className="flex h-full w-full flex-col py-2">
            <header className="flex flex-col px-6 pb-4">
              <div className="mx-4 my-2 flex w-full items-center gap-2">
                <UserCircleIcon className="h-16 w-16" />
                <div className="mb-1 flex w-full flex-col pr-6">
                  <div className="flex w-full items-center gap-2">
                    <p className="line-clamp-1 text-lg font-semibold text-stone-800">
                      Ap73MKa
                    </p>
                    <ArrowLeftOnRectangleIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
                  </div>
                  <p className="line-clamp-1 text-xs text-gray-500">
                    My account
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="my-2 h-10 w-full overflow-hidden rounded-xl bg-stone-800 shadow-lg"
              >
                <p className="text-lg text-white">New link</p>
              </button>
              <p className="pb-4 pt-2 text-2xl font-semibold">Links</p>
              <div className="flex h-10 w-full items-center gap-2 rounded-xl bg-white px-4 shadow-md">
                <MagnifyingGlassIcon className="mt-1 h-5 w-5 text-gray-500" />
                <p className="text-gray-500">Search...</p>
              </div>
            </header>
            <div className="flex h-full w-full flex-col overflow-hidden px-2">
              <ul className="flex h-full flex-col overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 scrollbar-thumb-rounded-md">
                {links.map((num) => (
                  <li
                    key={num}
                    className="mx-2 flex cursor-pointer items-center rounded-xl p-4 hover:bg-slate-100"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <VKIcon className="h-12 w-12 rounded-full contrast-[4] grayscale" />
                      </div>
                      <div className="mb-1 flex flex-col gap-1">
                        <p className="font-semibold text-gray-700">
                          Youtube channel
                        </p>
                        <p className="line-clamp-1 text-sm text-gray-400">
                          https://www.youtube.com/channel/Ap73MKa
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
          <div className="flex h-full w-full overflow-x-hidden shadow-inner lg:shadow-none">
            <div className="flex h-full w-full grid-cols-[1fr,18rem] grid-rows-1 flex-col-reverse overflow-y-auto lg:grid lg:flex-none lg:overflow-y-hidden">
              <div className="h-full w-full bg-gray-300/[.3] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300 lg:overflow-y-auto lg:shadow-inner">
                <div className="h-full w-full py-4">
                  <div className="flex flex-col px-8">
                    <p className="text-3xl font-semibold text-stone-700">
                      Analytics
                    </p>
                    <p className="text-4xl font-semibold">Dashboard</p>
                  </div>
                  <div className="flex h-full w-full flex-col px-8">
                    <div className="mb-24 mt-10 flex h-full max-h-80 w-full flex-col gap-4">
                      <div className="flex w-full justify-between">
                        <p className="text-2xl font-semibold text-stone-800">
                          Views statistics
                        </p>
                        <button
                          type="button"
                          className="flex items-center gap-2 rounded-lg bg-stone-800 px-3 py-1 shadow-lg"
                        >
                          <p className="text-white">Week</p>
                          <ChevronDownIcon className="mt-1 h-4 w-4 text-white" />
                        </button>
                      </div>
                      <WeekLineChart />
                    </div>
                    <div className="mb-16 flex h-full max-h-80 w-full flex-col gap-4">
                      <div className="flex w-full justify-between">
                        <p className="text-2xl font-semibold text-stone-800">
                          Devices statistics
                        </p>
                        <button
                          type="button"
                          className="flex items-center gap-2 rounded-lg bg-stone-800 px-3 py-1 shadow-lg"
                        >
                          <p className="text-white">OS</p>
                          <ChevronDownIcon className="mt-1 h-4 w-4 text-white" />
                        </button>
                      </div>
                      <DevicesChart />
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-full w-full bg-gray-300/[.3] lg:bg-transparent">
                <div className="flex w-full flex-col items-center px-4">
                  <div className="mt-10 flex w-full flex-col items-center gap-1">
                    <VKIcon className="h-16 w-16 rounded-full contrast-[4] grayscale" />
                    <p className="text-lg font-semibold text-gray-800">
                      Youtube channel
                    </p>
                  </div>
                  <div className="mx-auto mt-5 flex gap-5">
                    <div className="flex w-12 flex-col items-center justify-center gap-1">
                      <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-stone-800 shadow-md"
                      >
                        <QrCodeIcon className="h-5 w-5 text-stone-200" />
                      </button>
                      <p className="line-clamp-1 text-xs font-bold text-stone-800">
                        QR Code
                      </p>
                    </div>
                    <div className="flex w-12 flex-col items-center justify-center gap-1 overflow-hidden">
                      <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-stone-800 text-left shadow-md"
                      >
                        <PaperAirplaneIcon className="h-5 w-5 text-stone-200" />
                      </button>
                      <p className="line-clamp-1 text-ellipsis text-xs font-bold text-stone-800">
                        Share
                      </p>
                    </div>
                    <div className="flex w-12 flex-col items-center justify-center gap-1">
                      <button
                        type="button"
                        className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl bg-stone-800 shadow-md"
                      >
                        <TrashIcon className="h-5 w-5 text-stone-200" />
                      </button>
                      <p className="line-clamp-1 text-xs font-bold text-stone-800">
                        Delete
                      </p>
                    </div>
                  </div>
                  <div className="mt-6 flex w-full max-w-sm flex-col gap-4 px-4">
                    <div className="w-full">
                      <label
                        htmlFor="link"
                        className="font-semibold text-stone-800"
                      >
                        Link
                      </label>
                      <div className="mt-1 flex items-center overflow-hidden rounded-lg bg-white shadow">
                        <input
                          type="text"
                          id="link"
                          name="link"
                          disabled
                          className="h-8 w-full px-2"
                          value="https://www.sh0.su/fuVf1"
                        />
                        <ClipboardDocumentIcon className="mr-2 h-5 w-5 text-gray-700 hover:text-black" />
                      </div>
                    </div>
                    <div className="w-full">
                      <label
                        htmlFor="original"
                        className="font-semibold text-stone-800"
                      >
                        Original
                      </label>
                      <div className="mt-1 flex items-center overflow-hidden rounded-lg bg-white shadow">
                        <input
                          type="text"
                          id="original"
                          name="original"
                          disabled
                          className="h-8 w-full px-2"
                          value="https://www.youtube.com/channel/Ap73MKa"
                        />
                        <ClipboardDocumentIcon className="mr-2 h-5 w-5 text-gray-700 hover:text-black" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
