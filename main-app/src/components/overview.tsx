'use client'

import {
  ArrowPathIcon,
  ArrowTrendingUpIcon,
  ArrowUpOnSquareIcon,
  CalendarIcon,
  ClockIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  HandRaisedIcon,
  LinkIcon,
  PencilSquareIcon,
  QrCodeIcon,
  Squares2X2Icon,
  TagIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState } from 'react'

import DashboardCard from '@/components/dashboard-card'
import { DatePickerWithRange } from '@/components/date-picker-with-range'
import DescriptionItem from '@/components/description-item'
import { RecentViews } from '@/components/recent-views'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ViewsDiagram } from '@/components/views-diagram'
import avatar_artyom from '@/public/avatar_artyom.jpg'


export default function Overview() {
  const [currentTab, setCurrentTab] = useState<string>('all-time')

  return (
    <div className="size-full grow space-y-4 p-8 pt-6">
      <div className="w-full space-y-4 border-b pb-8 dark:border-b-zinc-800">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-14">
              <AvatarImage src={avatar_artyom.src} alt="avatar" />
              <AvatarFallback>Y</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h2 className="truncate text-2xl font-semibold tracking-tight">
                  Youtube links
                </h2>
                <Badge className="mt-[1px]">Group</Badge>
              </div>
              <span className="truncate text-sm text-zinc-400 dark:text-zinc-600">
                https://sh0.su/f56fx
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button className="hidden xl:flex">
              <EyeIcon className="mr-2 size-4" />
              Preview
            </Button>
            <Button>
              <QrCodeIcon className="mr-2 size-4" />
              QR code
            </Button>
            <Button className="hidden xl:flex">
              <ArrowUpOnSquareIcon className="mr-2 size-4" />
              Share
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <EllipsisHorizontalIcon className="size-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <PencilSquareIcon className="mr-2 size-4" />
                  <span>Edit</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <ArrowPathIcon className="mr-2 size-4" />
                  <span>Restore</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HandRaisedIcon className="mr-2 size-4" />
                  <span>Disable</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <TrashIcon className="mr-2 size-4" />
                  <span>Delete</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid w-full grid-cols-[auto_1fr] gap-4 pt-1 lg:grid-cols-[auto_1fr_auto_1fr]">
          <DescriptionItem title="Tag" Icon={TagIcon}>
            <Badge>Youtube</Badge>
          </DescriptionItem>
          <DescriptionItem title="Status" Icon={Squares2X2Icon}>
            <div className="flex w-fit items-center gap-2 overflow-hidden rounded-xl border border-green-300 bg-green-100/[.2] px-3 dark:border-green-600 dark:bg-green-900/[.2]">
              <div className="size-2 rounded-full bg-green-600" />
              <span className="text-green-700">Ready</span>
            </div>
          </DescriptionItem>
          <DescriptionItem title="Link" Icon={LinkIcon}>
            <Button variant="link" className="h-6 p-0" asChild>
              <Link href="https://youtube.com/channel/Ap73MKa" target="_blank">
                https://youtube.com/channel/Ap73MKa
              </Link>
            </Button>
          </DescriptionItem>
          <DescriptionItem title="Created" Icon={CalendarIcon}>
            21 Feb
          </DescriptionItem>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-2 pt-4 lg:flex-row lg:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="flex gap-3">
          <DatePickerWithRange />
          <Button>Download</Button>
        </div>
      </div>
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all-time">All time</TabsTrigger>
          <TabsTrigger value="year">Year</TabsTrigger>
          <TabsTrigger value="month">Month</TabsTrigger>
          <TabsTrigger value="week">Week</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardCard
          title="Total views"
          Icon={EyeIcon}
          value="1400"
          subvalue="+20.1% from last day"
        />
        <DashboardCard
          title="Unique"
          Icon={UserIcon}
          value="140"
          subvalue="+20.1% from last day"
        />
        <DashboardCard
          title="Trend"
          Icon={ArrowTrendingUpIcon}
          value="30%"
          subvalue="+4.1% from last day"
        />
        <DashboardCard
          title="Time left"
          Icon={ClockIcon}
          value="43 days"
          subvalue=""
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <ViewsDiagram />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentViews />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
