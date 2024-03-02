'use client'

import {
  ArrowUpOnSquareIcon,
  CalendarIcon,
  EllipsisHorizontalIcon,
  EyeIcon,
  HandRaisedIcon,
  LinkIcon,
  QrCodeIcon,
  Squares2X2Icon,
  TagIcon,
  TrashIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import useShortLink from '@/pages-flat/main/use-short-link'
import { ApiRecordType } from '@/shared/api/api-record-type'
import deleteLink from '@/shared/api/delete-link-action'
import dateFormate from '@/shared/lib/date-formate'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/ui/avatar'
import { Badge } from '@/shared/ui/badge'
import { Button } from '@/shared/ui/button'
import { Dialog, DialogTrigger } from '@/shared/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu'
import { useToast } from '@/shared/ui/use-toast'
import DescriptionItem from '@/widgets/description/description-item'
import QrCodeDialog from '@/widgets/description/qr-code-dialog'
import SocialShareDialog from '@/widgets/description/social-share-dialog'

export default function Description({ record }: { record: ApiRecordType }) {
  const shortLink = useShortLink(record)
  const router = useRouter()
  const { toast } = useToast()

  const createDt = dateFormate(new Date(record.createDt))

  const deleteRecord = async () => {
    const { data } = await deleteLink({
      linkUid: record.uid,
    })
    if (data?.failure) {
      toast({
        title: 'Error while deleting',
        description: data.failure,
      })
      return
    }
    router.push('/main')
  }

  return (
    <div className="w-full space-y-4 border-b pb-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage src="" alt="avatar" />
            <AvatarFallback>{record.title[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-2xl font-semibold tracking-tight">
                {record.title}
              </h2>
              <Badge className="mt-[1px]">Single</Badge>
            </div>
            <Link
              href={shortLink}
              className="truncate text-sm text-muted-foreground hover:underline hover:underline-offset-4"
            >
              {shortLink}
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="hidden xl:flex" asChild>
            <Link href={shortLink}>
              <EyeIcon className="mr-2 size-4" />
              Preview
            </Link>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hidden lg:flex">
                <QrCodeIcon className="mr-2 size-4" />
                QR code
              </Button>
            </DialogTrigger>
            <QrCodeDialog link={shortLink} />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="hidden xl:flex">
                <ArrowUpOnSquareIcon className="mr-2 size-4" />
                Share
              </Button>
            </DialogTrigger>
            <SocialShareDialog shortLink={shortLink} />
          </Dialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <EllipsisHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="xl:hidden" asChild>
                <Link href={shortLink}>
                  <EyeIcon className="mr-2 size-4" />
                  Preview
                </Link>
              </DropdownMenuItem>
              <Dialog>
                <DialogTrigger className="w-full lg:hidden">
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <QrCodeIcon className="mr-2 size-4" />
                    QR code
                  </DropdownMenuItem>
                </DialogTrigger>
                <QrCodeDialog link={shortLink} />
              </Dialog>
              <Dialog>
                <DialogTrigger className="w-full xl:hidden">
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <ArrowUpOnSquareIcon className="mr-2 size-4" />
                    Share
                  </DropdownMenuItem>
                </DialogTrigger>
                <SocialShareDialog shortLink={shortLink} />
              </Dialog>
              <DropdownMenuItem>
                <HandRaisedIcon className="mr-2 size-4" />
                <span>Disable</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={deleteRecord}>
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
            <Link href={record.url} target="_blank">
              {record.url}
            </Link>
          </Button>
        </DescriptionItem>
        <DescriptionItem title="Created" Icon={CalendarIcon}>
          {createDt}
        </DescriptionItem>
      </div>
    </div>
  )
}
