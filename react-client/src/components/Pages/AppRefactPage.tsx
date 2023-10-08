'use client'

import {
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
  QrCodeIcon,
  PaperAirplaneIcon,
  TrashIcon,
  ClipboardDocumentIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import clsx from 'clsx'
import Image from 'next/image'
import { ComponentType } from 'react'

import DevicesChart from '@/components/Charts/DevicesChart'
import WeekLineChart from '@/components/Charts/WeekLineChart'
import avatar_artyom from '@/public/avatar_artyom.jpg'

function ProjectButton({
  text,
  Icon,
}: {
  text: string
  Icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex w-12 flex-col items-center justify-center gap-1">
      <button
        type="button"
        className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-black/[.1]
         bg-sky-400 shadow transition-colors hover:bg-sky-300"
      >
        <Icon className="h-5 w-5 text-white" />
      </button>
      <p className="line-clamp-1 text-xs font-semibold">{text}</p>
    </div>
  )
}

function InputText({
  id,
  value,
  label,
}: {
  id: string
  value: string
  label: string
}) {
  return (
    <div className="w-full">
      <label htmlFor={id} className="font-semibold text-stone-800">
        {label}
      </label>
      <div className="mt-1 flex items-center overflow-hidden rounded-lg border bg-white">
        <input
          type="text"
          id={id}
          name="link"
          disabled
          className="h-8 w-full bg-transparent px-2 hover:cursor-text"
          value={value}
        />
        <ClipboardDocumentIcon className="mr-2 h-5 w-5 text-gray-700 hover:text-black" />
      </div>
    </div>
  )
}

function LinkItem({ isActive }: { isActive: boolean }) {
  return (
    <button
      type="button"
      className={clsx(
        isActive ? 'relative bg-sky-100' : '',
        'flex w-full items-center justify-center gap-3 py-3 pl-6 pr-4'
      )}
    >
      {isActive && (
        <div className="absolute inset-y-0 left-0 w-1 rounded-full bg-sky-400" />
      )}
      <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full">
        <Image
          src={avatar_artyom.src}
          width={avatar_artyom.width}
          height={avatar_artyom.height}
          alt=""
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex h-14 w-full flex-col gap-1 overflow-hidden text-left">
        <div className="flex w-full items-center justify-between gap-2">
          <p className="line-clamp-1 truncate text-sm font-semibold leading-tight">
            Youtube Channelfrfrfr
          </p>
          <p className="mt-[1px] shrink-0 text-xs leading-tight tracking-tight text-gray-700">
            2 hours ago
          </p>
        </div>
        <p className="line-clamp-2 text-ellipsis text-left text-xs leading-tight text-gray-500">
          Please add more information about your pesonal web site so we can
          address
        </p>
      </div>
    </button>
  )
}

export default function AppPage() {
  const buttons = [
    { id: 1, title: 'QR', icon: QrCodeIcon },
    { id: 2, title: 'Share', icon: PaperAirplaneIcon },
    { id: 3, title: 'Delete', icon: TrashIcon },
  ]
  const links = Array.from(Array(10).keys())
  return (
    <div className="h-full w-full grid-cols-[18rem,1fr] grid-rows-1 divide-x border-x sm:grid">
      <div className="sticky top-0 flex h-screen w-full grow flex-col overflow-hidden bg-white">
        <div className="flex h-[63px] w-full shrink-0 items-center justify-center text-center">
          <a href="/links1">
            <p className="text-3xl font-extrabold">Shorty</p>
          </a>
        </div>
        <div className="flex h-full w-full flex-col overflow-hidden border-y bg-slate-50">
          <div className="my-2 flex h-10 w-full items-center justify-between pl-6 pr-2">
            <p className="text-2xl font-semibold">Links</p>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg border bg-slate-100 transition hover:bg-white"
              >
                <MagnifyingGlassIcon className="h-4 w-4 text-gray-500" />
              </button>
              <button
                type="button"
                className="flex h-8 items-center justify-center overflow-hidden rounded-lg border border-black/[.1] bg-sky-400 px-4 transition hover:bg-sky-300"
              >
                <p className="text-white">New</p>
              </button>
            </div>
          </div>
          <div className="h-full w-full overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-gray-300/[.6] scrollbar-corner-transparent">
            <ul className="flex h-full w-full flex-col">
              <li className="w-full">
                <LinkItem isActive />
              </li>
              {links.map((item) => (
                <li key={item.valueOf()} className="w-full">
                  <LinkItem isActive={false} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex w-full items-center justify-center gap-2 py-3">
          <div className="h-12 w-12 overflow-hidden rounded-full">
            <Image
              src={avatar_artyom.src}
              width={avatar_artyom.width}
              height={avatar_artyom.height}
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-1">
              <p className="font-semibold">Ap73MKa</p>
              <button type="button">
                <ArrowLeftOnRectangleIcon className="mt-[1px] h-4 w-4 text-gray-500 hover:text-gray-700" />
              </button>
            </div>
            <p className="text-xs text-gray-500">My account</p>
          </div>
        </div>
      </div>
      {/* eslint-disable tailwindcss/migration-from-tailwind-2 */}
      <div className="relative hidden w-full overflow-clip sm:flex sm:flex-col">
        <div className="sticky top-0 z-20 flex h-16 w-full shrink-0 items-center border-b border-b-black/[.1] bg-white/[.5] backdrop-blur">
          <p className="ml-10 text-2xl">Project</p>
        </div>
        <div className="flex h-full w-full flex-col-reverse lg:grid lg:flex-none lg:grid-cols-[1fr,18rem] lg:grid-rows-1 lg:divide-x lg:bg-slate-50">
          <div className="mx-auto flex h-full w-full max-w-[70rem] flex-wrap content-start items-stretch justify-center gap-x-5 gap-y-10 overflow-x-hidden px-4 pb-10 pt-6 md:px-10 2xl:justify-between">
            <div className="h-72 w-full min-w-[20rem] max-w-full shrink grow basis-[18rem] overflow-hidden rounded-2xl border bg-white shadow-sm xl:max-w-md">
              <div className="grid h-full w-full grid-cols-[1fr,12rem] grid-rows-3 flex-wrap divide-x">
                <div className="relative row-span-3 h-full w-full">
                  <div className="absolute left-0 top-0 ml-4 mt-2">
                    <p className="text-xl">Total views</p>
                  </div>
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="relative px-8">
                      <p className="text-6xl font-semibold text-sky-500">
                        14.5k
                      </p>
                      <div className="absolute -top-4 right-4">
                        <p className="text-lg text-gray-500">+ 140</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex h-full w-full flex-col justify-center border-b px-4">
                  <p>Unique</p>
                  <p className="text-3xl font-semibold text-gray-700">1.45k</p>
                </div>
                <div className="col-start-2 row-start-2 flex h-full w-full flex-col justify-center border-b px-4">
                  <p>Trend</p>
                  <p className="text-3xl font-semibold text-green-500">40%</p>
                </div>
                <div className="col-start-2 row-start-3 flex h-full w-full flex-col justify-center px-4">
                  <p>Time left</p>
                  <p className="text-3xl font-semibold text-red-500">2 weeks</p>
                </div>
              </div>
            </div>
            <div className="relative flex h-72 w-full min-w-[18rem] max-w-full shrink grow basis-[18rem] flex-col justify-center gap-4 overflow-hidden rounded-2xl border bg-white px-4 pt-4 shadow-sm xl:max-w-xl">
              <div className="absolute right-0 top-0 mt-2 flex justify-between px-4">
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg bg-sky-400 px-3 py-1 shadow"
                >
                  <p className="text-white">OS</p>
                  <ChevronDownIcon className="mt-1 h-4 w-4 text-white" />
                </button>
              </div>
              <div className="h-full w-full">
                <DevicesChart />
              </div>
            </div>
            <div className="flex h-[24rem] w-full max-w-full flex-col gap-4 overflow-hidden rounded-2xl border bg-white px-8 py-4 shadow-sm">
              <div className="mb-4 flex w-full justify-between">
                <p className="text-2xl font-semibold text-stone-800">
                  Views statistics
                </p>
                <button
                  type="button"
                  className="flex items-center gap-2 rounded-lg border border-black/[.1] bg-sky-400 px-3 py-1 shadow"
                >
                  <p className="text-white">Week</p>
                  <ChevronDownIcon className="mt-1 h-4 w-4 text-white" />
                </button>
              </div>
              <div className="h-full w-full">
                <WeekLineChart />
              </div>
            </div>
          </div>
          <div className="mb-10 h-fit w-full bg-white px-4 lg:mb-0 lg:h-full">
            <div className="h-full w-full pt-5">
              <div className="flex w-full flex-col items-center gap-2">
                <div className="h-24 w-24 overflow-hidden rounded-full">
                  <Image
                    src={avatar_artyom.src}
                    width={avatar_artyom.width}
                    height={avatar_artyom.height}
                    alt=""
                    className="h-full w-full"
                  />
                </div>
                <p className="text-xl">Youtube Channel</p>
              </div>
              <ul className="mt-4 flex flex-row items-center justify-center gap-5">
                {buttons.map((item) => (
                  <li key={item.id}>
                    <ProjectButton text={item.title} Icon={item.icon} />
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex w-full items-center justify-center px-4">
                <div className="flex w-full max-w-sm flex-col gap-8">
                  <InputText
                    id="shortedVersion"
                    value="https://www.sh0.su/fX6bg"
                    label="Link"
                  />
                  <InputText
                    id="originalVersion"
                    value="https://www.youtube.com/c/Ap73MKa"
                    label="Original"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
