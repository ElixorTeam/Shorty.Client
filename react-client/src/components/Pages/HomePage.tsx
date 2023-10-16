'use client'

import { ChevronUpIcon, LockClosedIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import { ReactNode } from 'react'

import ExampleLineChart from '@/components/Charts/ExampleLineChart'
import QRGenerator from '@/components/DetailsPanel/QRGenerator'
import cursor from '@/public/cursor.svg'
import elixor from '@/public/ElixorIcon.png'

function FeatureCard({
  title,
  description,
  children,
}: {
  title: string
  description: string
  children: ReactNode
}) {
  return (
    <div className="flex h-[24rem] w-[24rem] flex-col overflow-hidden rounded-2xl border bg-gradient-to-br from-white to-gray-100 shadow-sm transition hover:border-black/[.3] hover:shadow dark:border-white/[.15] dark:from-neutral-900 dark:to-black dark:hover:border-white/[.3]">
      <div className="relative h-full w-full overflow-hidden">{children}</div>
      <div className="h-32 px-6 py-1">
        <p className="mb-1 text-xl font-semibold leading-tight tracking-tight text-neutral-800 dark:text-neutral-200">
          {title}
        </p>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {description}
        </p>
      </div>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="mt-16 h-full w-full">
      <div className="flex h-[30rem] flex-col items-center justify-center px-6 text-center">
        <p className="bg-gradient-to-b from-gray-500 to-gray-900 bg-clip-text py-5 text-3xl font-semibold text-transparent dark:from-neutral-100 dark:to-neutral-500 md:text-5xl">
          Shorten, Manage, Analyze. Your key to efficient links.
        </p>
        <p className="max-w-screen-md font-light text-gray-600 dark:text-neutral-400 md:mt-4 md:text-xl">
          Unlock the power of efficient linking. Our service offers a simple,
          user-friendly platform for shortening, managing, and analyzing your
          links.
        </p>
        <a href="/app">
          <button
            type="button"
            className="mt-8 rounded-lg border border-white/[.15] bg-gray-800 px-6 py-2 transition hover:bg-gray-600 dark:bg-neutral-200 dark:hover:bg-neutral-50"
          >
            <p className="text-gray-100 dark:text-neutral-800">Get Started</p>
          </button>
        </a>
      </div>
      <div className="mt-4 w-full text-center">
        <p className="text-3xl font-thin tracking-tight text-neutral-700 dark:text-neutral-300">
          What does{' '}
          <span className="font-extrabold text-gray-800 dark:text-gray-300">
            Shorty
          </span>{' '}
          gives you?
        </p>
      </div>
      <div className="mx-auto mb-5 mt-10 flex h-full w-full max-w-screen-xl flex-wrap justify-center gap-6 px-4">
        <FeatureCard
          title="Grouped link"
          description="Create beautiful group links for easy access to your information resources (e.g. social networks)."
        >
          <div className="flex h-full w-full items-center justify-center">
            <div className="h-[14rem] w-[14rem] overflow-hidden rounded-xl border bg-white dark:border-white/[.15] dark:bg-neutral-950">
              <div className="flex h-16 w-full items-center justify-center gap-2 border-b dark:border-b-white/[.15]">
                <UserCircleIcon className="h-12 w-12 text-neutral-400" />
                <div className="mb-1 leading-tight">
                  <p>User</p>
                  <p className="text-xs text-neutral-700">Account</p>
                </div>
              </div>
              <div className="flex h-full w-full">
                <ul className="flex w-full flex-col gap-6 py-4">
                  <li className="flex w-full gap-3 px-4">
                    <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full border dark:border-white/[.15]">
                      <Image src={elixor} alt="" className="h-full w-full" />
                    </div>
                    <div className="w-full">
                      <div className="flex w-full items-center justify-between gap-2">
                        <p className="font-semibold">Elixor</p>
                        <p className="text-xs">9 Oct.</p>
                      </div>
                      <p className="text-xs">https://sh0.su/fVdcg</p>
                    </div>
                  </li>
                  <li className="flex w-full gap-3 px-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-200 text-center">
                      <p className="text-3xl text-white">Y</p>
                    </div>
                    <div className="w-full">
                      <div className="flex w-full items-center justify-between gap-2">
                        <p className="font-semibold">Youtube</p>
                        <p className="text-xs">10 Oct.</p>
                      </div>
                      <p className="line-clamp-1 text-xs">
                        https://sh0.su/c6fcg
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </FeatureCard>
        <FeatureCard
          title="Analytics"
          description="Get information about unique clicks, os, browser, device, total views and trends."
        >
          <div className="flex h-full w-full overflow-hidden p-10">
            <ExampleLineChart />
          </div>
        </FeatureCard>
        <FeatureCard
          title="Private links"
          description="Make links private so that only right people get access."
        >
          <div className="flex h-full w-full flex-col items-center justify-center overflow-hidden">
            <p className="text-3xl font-light dark:text-neutral-300">
              This link is{' '}
              <span className="font-bold text-gray-800 dark:text-white">
                private
              </span>
            </p>
            <div className="mt-4 flex h-8 w-52 items-center gap-2 overflow-hidden rounded-lg border bg-white dark:border-white/[.15] dark:bg-neutral-950">
              <input
                type="text"
                disabled
                className="h-full w-full border-none bg-transparent px-2 text-sm font-light placeholder:text-neutral-600 focus:outline-none"
                placeholder="Enter password..."
              />
              <LockClosedIcon className="mr-2 h-4 w-4 text-gray-700 dark:text-neutral-500" />
            </div>
          </div>
        </FeatureCard>
        <FeatureCard
          title="Custom prefix"
          description="Add your own prefix to the link so that everyone knows that this is your link."
        >
          <Image
            src={cursor}
            alt=""
            className="absolute left-[12rem] top-[11rem] z-20 h-10 w-10 dark:invert"
          />
          <div className="absolute left-[5rem] top-[7rem] flex h-20 w-[50rem] items-center overflow-hidden rounded-2xl border bg-white px-4 dark:border-white/[.15] dark:bg-neutral-950">
            <p className="text-5xl text-gray-400 dark:text-neutral-600">
              <span className="text-gray-800 dark:text-neutral-200">
                elixor
              </span>
              .sh0.su/custom
            </p>
          </div>
        </FeatureCard>
        <FeatureCard
          title="QR Code"
          description="On the website you can easily create a QR code for your link and immediately share it on social networks."
        >
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <div className="h-fit w-fit overflow-hidden rounded-2xl border">
              <QRGenerator text="https://www.sh0.su/f1Gbf" />
            </div>
          </div>
        </FeatureCard>
        <FeatureCard
          title="Customization"
          description="You can group links, change names and even icon. Everything for your comfort."
        >
          <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
            <div className="mx-auto flex h-[14rem] w-[14rem] flex-col gap-2">
              <button
                type="button"
                className="flex h-7 items-center justify-between overflow-hidden rounded-md border bg-white px-2 hover:bg-gray-50 dark:border-white/[.15] dark:bg-neutral-950 dark:hover:bg-neutral-900"
              >
                <div className="flex items-center gap-2 text-gray-500 dark:text-neutral-400">
                  <p className="text-sm">Instagram</p>
                  <p className="text-xs">4</p>
                </div>
                <ChevronDownIcon className="h-4 w-4 text-gray-500 dark:text-neutral-400" />
              </button>
              <button
                type="button"
                className="flex h-7 items-center justify-between overflow-hidden rounded-md border bg-white px-2 hover:bg-gray-50 dark:border-white/[.15] dark:bg-neutral-950 dark:hover:bg-neutral-900"
              >
                <div className="flex items-center gap-2 text-gray-500 dark:text-neutral-200">
                  <p className="text-sm">Youtube</p>
                  <p className="text-xs">2</p>
                </div>
                <ChevronUpIcon className="h-4 w-4 text-gray-500 dark:text-neutral-200" />
              </button>
              <ul className="flex w-full flex-col gap-4 py-2">
                <li className="flex w-full gap-3 px-4">
                  <div className="h-12 w-12 shrink-0 overflow-hidden rounded-full">
                    <Image src={elixor} alt="" className="h-full w-full" />
                  </div>
                  <div className="w-full">
                    <div className="flex w-full items-center justify-between gap-2">
                      <p className="font-semibold">Elixor</p>
                      <p className="text-xs">9 Oct.</p>
                    </div>
                    <p className="text-xs">https://elixor.com</p>
                  </div>
                </li>
                <li className="flex w-full gap-3 px-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-200 text-center">
                    <p className="text-3xl text-white">Y</p>
                  </div>
                  <div className="w-full">
                    <div className="flex w-full items-center justify-between gap-2">
                      <p className="font-semibold">Youtube</p>
                      <p className="text-xs">10 Oct.</p>
                    </div>
                    <p className="line-clamp-1 text-xs">
                      https://youtube.com/c/Elixor
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </FeatureCard>
      </div>
    </div>
  )
}
