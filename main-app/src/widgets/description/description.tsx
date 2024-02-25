import {
  ArrowPathIcon,
  ArrowUpOnSquareIcon,
  CalendarIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  HandRaisedIcon,
  LinkIcon,
  PencilSquareIcon,
  QrCodeIcon,
  Squares2X2Icon,
  TagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import avatar_artyom from '@/public/avatar_artyom.jpg'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import DescriptionItem from '@/widgets/description/description-item'

export default function Description() {
  return (
    <div className="w-full space-y-4 border-b pb-8">
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
            <span className="text-muted-foreground truncate text-sm">
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
  )
}
