import { Badge } from '@repo/ui/badge'
import {
  Bento,
  BentoContent,
  BentoDescription,
  BentoTitle,
} from '@repo/ui/bento'
import { Button } from '@repo/ui/button'
import {
  ArrowRightIcon,
  BoxesIcon,
  LockIcon,
  QrCodeIcon,
  SquareChartGanttIcon,
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import ShortyScreenshot from '@/public/shorty-screenshot.png'
import { ROUTES } from '@/shared/consts/routes'

import { ChartExample } from './chart-example'
import { NavigationBar } from './navigation-bar'
import { QrcodeExample } from './qrcode-example'

export async function Page() {
  return (
    <div className="relative size-full">
      <NavigationBar />
      <div className="relative mx-auto flex max-w-7xl flex-col items-center justify-center px-4 pt-24 pb-10 md:pt-40 md:pb-20 xl:border-x">
        <div className="absolute inset-0 -z-10 [background-image:radial-gradient(#d4d4d4_1px,transparent_1px)] [background-size:20px_20px] dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]" />
        <div className="bg-background pointer-events-none absolute inset-0 -z-10 flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        <Badge variant="outline" className="bg-background">
          Short every link <ArrowRightIcon className="size-2.5" />
        </Badge>
        <h1 className="mt-4 text-center text-3xl tracking-tight md:text-4xl lg:text-6xl">
          For those who don’t <br /> agree with looong{' '}
          <span className="font-extrabold">links</span>
        </h1>
        <h2 className="text-muted-foreground mx-auto mt-6 max-w-lg text-center text-sm tracking-tight md:text-sm lg:text-base">
          Shorten. Share. Analyze. All in one place.
        </h2>
        <div className="mt-6 flex items-center gap-4">
          <Button asChild>
            <Link href={ROUTES.LINKS}>Get started</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="#features">Learn more</Link>
          </Button>
        </div>
      </div>

      <div className="bg-border h-px w-full"></div>

      <div className="bg-muted dark:bg-muted/10 relative mx-auto flex max-w-7xl items-start justify-start p-2 perspective-distant md:p-4 lg:p-8 xl:border-x">
        <div className="overflow-hidden rounded-sm border shadow-xs sm:rounded-lg">
          <Image
            src={ShortyScreenshot}
            alt="Shorty Screenshot"
            className="dark:invert"
          />
        </div>
      </div>

      <div className="bg-border h-px w-full"></div>

      <div className="mx-auto max-w-7xl xl:border-x" id="features">
        <div className="flex flex-col items-center py-16">
          <Badge>Features</Badge>
          <h1 className="mt-4 text-center text-2xl tracking-tight md:text-3xl lg:text-4xl">
            Built to make linking simple
          </h1>
          <h2 className="text-muted-foreground mx-auto mt-3 max-w-lg px-2 text-center text-sm font-light tracking-tight md:text-sm">
            Shorty takes the pain out of sharing links. No clutter, no confusion
            — just fast, reliable short links you can create and share in
            seconds.
          </h2>
        </div>
      </div>

      <div className="bg-border h-px w-full"></div>

      <div className="mx-auto flex size-full max-w-7xl items-center justify-between">
        <div className="grid w-full grid-cols-1 divide-y lg:grid-cols-8 lg:divide-x lg:border-l">
          <Bento className="bg-background col-span-1 lg:col-span-5 lg:border-r">
            <BentoTitle className="flex items-center gap-2">
              <SquareChartGanttIcon className="size-5" />
              Easily analyze visitors
            </BentoTitle>
            <BentoDescription>
              Track every click in real time — see what devices your visitors
              use and how your links perform.
            </BentoDescription>
            <BentoContent className="h-56 pt-6 lg:pt-12">
              <ChartExample />
            </BentoContent>
          </Bento>
          <Bento className="bg-background col-span-1 lg:col-span-3 lg:border-r">
            <BentoTitle className="flex items-center gap-2">
              <QrCodeIcon className="size-5" />
              Share links anywhere
            </BentoTitle>
            <BentoDescription>
              Instantly generate QR codes for offline sharing or use built-in
              social share tools.
            </BentoDescription>
            <BentoContent className="flex items-center justify-center py-3">
              <QrcodeExample />
            </BentoContent>
          </Bento>
          <Bento className="bg-background col-span-1 lg:col-span-4 lg:border-r lg:border-b-0">
            <BentoTitle className="flex items-center gap-2">
              <BoxesIcon className="size-5" />
              Group your links
            </BentoTitle>
            <BentoDescription>
              Organize your short links into collections. Perfect for managing
              campaigns, projects, or simply keeping your personal links tidy
              and easy to find.
            </BentoDescription>
          </Bento>
          <Bento className="bg-background col-span-1 lg:col-span-4 lg:border-r">
            <BentoTitle className="flex items-center gap-2">
              <LockIcon className="size-4.5" />
              Keep links private
            </BentoTitle>
            <BentoDescription>
              Protect your links with a password or make them visible only to
              you. Share only what you want, with the people you choose.
            </BentoDescription>
          </Bento>
        </div>
      </div>

      <div className="bg-border h-px w-full"></div>

      <div className="mx-auto flex size-full max-w-7xl lg:border-x">
        <div className="mt-6 mb-4 flex w-full flex-row items-center justify-between px-4 sm:px-8">
          <p className="text-muted-foreground text-sm">
            © 2025 Elixor Company. All rights reserved.
          </p>
          <Link href="https://github.com/ElixorTeam/Shorty.Client">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              role="img"
              viewBox="0 0 24 24"
              className="size-5"
            >
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
