import { Button } from '@repo/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from '@repo/ui/card'
import { cn } from '@repo/ui/lib/utils'
import { LockIcon, TextCursorIcon, UserCircleIcon } from 'lucide-react'
import Link from 'next/link'

import ROUTES from '@/shared/routes'

import ChartExample from './chart-example'
import HomeFooter from './home-footer'
import HomeHeader from './home-header'
import QrcodeExample from './qrcode-example'
import Spotlight from './spotlight'
import TextGenerator from './text-generator'

export default async function HomePage() {
  return (
    <div className="bg-grid-black/[.03] dark:bg-grid-white/[.02] min-h-screen w-full">
      <div
        className={cn(
          'absolute inset-0',
          '[background-size:20px_20px]',
          '[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]',
          'dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]'
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_1%,black)] dark:bg-black"></div>
      <HomeHeader />
      <main className="relative mx-auto size-full max-w-screen-xl grow">
        <Spotlight className="-top-96 left-20 hidden md:-top-60 md:left-52 dark:block" />
        <div className="my-16 flex flex-col items-center justify-center gap-6 px-6 text-center md:my-32">
          <TextGenerator
            words="Shorten, Manage, Analyze. Your key to efficient links."
            className="from-primary to-muted-foreground bg-gradient-to-b bg-clip-text text-2xl font-semibold text-transparent lg:text-4xl"
          />
          <div className="max-w-screen-md">
            <TextGenerator
              words="Unlock the power of efficient linking. Our service offers a simple,
              user-friendly platform for shortening, managing, and analyzing your
              links."
              className="text-muted-foreground font-light lg:text-lg"
            />
          </div>
          <Button size="lg" variant="secondary" type="button" asChild>
            <Link href={ROUTES.LINKS}>Get Started</Link>
          </Button>
        </div>
        <h2 className="text-primary pb-10 text-center text-xl font-extralight tracking-tight lg:text-3xl">
          What does <span className="font-bold">Shorty</span> gives you?
        </h2>
        <div className="flex flex-wrap gap-6 px-6 py-10">
          <Card className="flex h-96 w-full grow flex-col justify-self-center md:basis-80">
            <CardContent className="flex h-full flex-col items-center justify-center">
              <h3 className="text-primary text-center text-3xl font-extralight tracking-tighter">
                This link is{' '}
                <span className="font-bold tracking-normal">private</span>
              </h3>
              <div className="mt-4 flex h-8 w-52 items-center gap-2 overflow-hidden rounded-lg border">
                <input
                  type="text"
                  className="placeholder:text-primary size-full border-none bg-transparent px-2 text-sm font-light focus:outline-none"
                  placeholder="Enter password..."
                />
                <LockIcon className="text-primary mr-2 size-4" />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
              <CardTitle>Private links</CardTitle>
              <CardDescription>
                Make links private so that only right people get access
              </CardDescription>
            </CardFooter>
          </Card>
          <Card className="flex h-96 w-full grow flex-col justify-self-center md:basis-80">
            <CardContent className="relative flex h-full flex-col items-center justify-center overflow-hidden">
              <TextCursorIcon className="text-primary absolute top-40 left-44 z-30 size-12 stroke-[0.8]" />
              <div className="absolute top-28 left-20 flex h-20 w-[50rem] items-center overflow-hidden rounded-2xl border bg-white px-4 dark:border-white/[.15] dark:bg-neutral-950">
                <p className="text-muted text-5xl">
                  <span className="text-primary">elixor</span>
                  .sh0.su/custom
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
              <CardTitle>Custom prefix</CardTitle>
              <CardDescription>
                Add your own prefix to the link so that everyone knows that this
                is your link
              </CardDescription>
            </CardFooter>
          </Card>
          <Card className="flex h-96 w-full grow flex-col justify-self-center md:basis-80">
            <CardContent className="relative flex h-full flex-col items-center justify-center overflow-hidden">
              <div className="size-56 overflow-hidden rounded-xl border bg-white dark:border-white/[.15] dark:bg-neutral-950">
                <div className="flex h-16 w-full items-center justify-center gap-2 border-b dark:border-b-white/[.15]">
                  <UserCircleIcon className="text-muted-foreground size-12" />
                  <div className="mb-1 leading-tight">
                    <p>User</p>
                    <p className="text-xs text-neutral-700">Account</p>
                  </div>
                </div>
                <div className="flex size-full">
                  <ul className="flex w-full flex-col gap-6 py-4">
                    <li className="flex w-full gap-3 px-4">
                      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full border">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          version="1.0"
                          viewBox="0 0 2048 2048"
                          className="text-muted size-8 pb-1"
                        >
                          <path d="M1029.5 128.5c1.18-.219 2.18.114 3 1l1002 1737c-669 1.33-1338 1.33-2007 0 47.8737-83.25 95.874-166.42 144-249.5 478.667-.33 957.33-.67 1436-1-192.29-332.75-384.46-665.585-576.5-998.5-143.581 249.497-287.414 498.83-431.5 748-94.333 1.33-188.667 1.33-283 0 237.943-412.225 475.61-824.558 713-1237Z" />
                        </svg>
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
                      <div className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-red-200 text-center">
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
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
              <CardTitle>Grouped link</CardTitle>
              <CardDescription>
                Create beautiful group links for easy access to your information
                resources (e.g. social networks)
              </CardDescription>
            </CardFooter>
          </Card>
          <Card className="flex h-96 w-full grow flex-col justify-self-center md:basis-80">
            <CardContent className="relative flex h-full flex-col items-center justify-center overflow-hidden p-6">
              <ChartExample />
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
              <CardTitle>Analytics</CardTitle>
              <CardDescription>
                Get information about unique clicks, os, browser, device, total
                views and trends
              </CardDescription>
            </CardFooter>
          </Card>
          <Card className="flex h-96 w-full grow flex-col justify-self-center md:basis-80">
            <CardContent className="relative flex h-full flex-col items-center justify-center overflow-hidden p-6">
              <QrcodeExample />
            </CardContent>
            <CardFooter className="flex flex-col items-start space-y-2">
              <CardTitle>QR Code</CardTitle>
              <CardDescription>
                On the website you can easily create a QR code for your link and
                immediately share it on social networks
              </CardDescription>
            </CardFooter>
          </Card>
        </div>
      </main>
      <HomeFooter />
    </div>
  )
}
