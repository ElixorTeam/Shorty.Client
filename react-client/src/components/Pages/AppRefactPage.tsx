'use client'

import {
  MagnifyingGlassIcon,
  ArrowLeftOnRectangleIcon,
  QrCodeIcon,
  PaperAirplaneIcon,
  TrashIcon,
  ClipboardDocumentIcon,
  EyeIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
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

function StatItem({
  text,
  value,
  Icon,
}: {
  text: string
  value: number
  Icon: ComponentType<{ className?: string }>
}) {
  return (
    <div className="flex h-full w-full items-center justify-center gap-2 overflow-hidden px-1">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-400 lg:h-14 lg:w-14">
        <Icon className="h-8 w-8 text-white" />
      </div>
      <div>
        <p className="line-clamp-1 text-stone-600">{text}</p>
        <p className="text-3xl font-semibold tracking-tight">{value}</p>
      </div>
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

export default function AppPage() {
  const buttons = [
    { id: 1, title: 'QR', icon: QrCodeIcon },
    { id: 2, title: 'Share', icon: PaperAirplaneIcon },
    { id: 3, title: 'Delete', icon: TrashIcon },
  ]
  const stats = [
    { id: 1, text: 'Daily view', value: 15, icon: EyeIcon },
    { id: 2, text: 'Trendings', value: 40, icon: EyeIcon },
    { id: 3, text: 'Total views', value: 150, icon: EyeIcon },
  ]
  const links = Array.from(Array(20).keys())
  return (
    <div className="h-full w-full grid-cols-[18rem,1fr] grid-rows-1 divide-x border-x sm:grid">
      <div className="sticky top-0 flex h-screen w-full grow flex-col divide-y overflow-hidden">
        <div className="flex h-[63px] w-full shrink-0 items-center justify-center text-center">
          <p className="text-3xl font-extrabold">Shorty</p>
        </div>
        <div className="flex h-full w-full flex-col divide-y overflow-hidden">
          <div className="relative flex h-10 w-full shrink-0 items-center justify-center px-5">
            <input
              type="text"
              placeholder="Search link..."
              className="mx-auto h-full w-full overflow-hidden bg-white px-2 pr-5 focus:outline-none"
            />
            <MagnifyingGlassIcon className="absolute right-0 top-0 mr-4 mt-[7px] h-5 w-5 text-gray-400" />
          </div>
          <div className="flex h-10 shrink-0 items-center gap-1 px-7">
            <p className="">Sort by</p>
            <p className="text-sky-400">Name</p>
            <ChevronDownIcon className="mt-1 h-3 w-3 text-sky-400" />
          </div>
          <div className="h-full w-full bg-slate-50">
            <ul className="flex h-full w-full flex-col gap-5 overflow-y-auto py-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-200 scrollbar-corner-transparent">
              {links.map((item) => (
                <li key={item.valueOf()} className="w-full pl-4 pr-2">
                  <button
                    type="button"
                    className="flex w-full items-center gap-4"
                  >
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                      <Image
                        src={avatar_artyom.src}
                        width={avatar_artyom.width}
                        height={avatar_artyom.height}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="mb-1 flex w-full flex-col overflow-hidden text-left">
                      <div className="flex w-full items-center justify-between">
                        <p className="line-clamp-1">Youtube Channel</p>
                        <p className="text-xs text-gray-700">08.10.23</p>
                      </div>

                      <p className="line-clamp-1 text-xs text-gray-500">
                        https://www.youtube.com/c/Ap73MKa
                      </p>
                    </div>
                  </button>
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
      <div className="relative hidden h-full w-full overflow-hidden sm:flex sm:flex-col">
        <div className="sticky top-0 flex h-16 w-full shrink-0 items-center border-b border-b-black/[.1] backdrop-blur">
          <p className="ml-10 text-2xl">Project</p>
        </div>
        <div className="flex h-full w-full flex-col-reverse divide-x overflow-hidden lg:grid lg:flex-none lg:grid-cols-[1fr,18rem] lg:grid-rows-1">
          <div className="h-full w-full grow">
            <div className="flex h-fit w-full flex-col px-10 pt-4">
              <p className="text-3xl font-semibold">Analytics</p>
              <div className="my-10 flex h-full w-full flex-col gap-10">
                <ul className="mx-auto flex h-24 w-full max-w-screen-md divide-x divide-black/[.1] overflow-hidden rounded-2xl border">
                  {stats.map((item) => (
                    <li key={item.id} className="w-1/3">
                      <StatItem
                        text={item.text}
                        value={item.value}
                        Icon={item.icon}
                      />
                    </li>
                  ))}
                </ul>
                <div className="mx-auto flex h-[28rem] w-full max-w-screen-xl flex-col gap-4 overflow-hidden rounded-2xl border p-8">
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
                <div className="mx-auto flex h-[28rem] w-full max-w-screen-xl flex-col gap-4 overflow-hidden rounded-2xl border p-8">
                  <div className="mb-5 flex w-full justify-between">
                    <p className="text-2xl font-semibold text-stone-800">
                      Devices statistics
                    </p>
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
              </div>
            </div>
          </div>
          <div className="h-full w-full overflow-hidden px-4">
            <div className="mt-5 w-full">
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
