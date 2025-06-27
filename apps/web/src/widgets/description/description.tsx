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
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/avatar'
import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@repo/ui/dropdown-menu'
import { toast } from 'sonner'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import {
  deleteLinkAction,
  getFormattedDate,
  RecordType,
  RecordTypesEnum,
  updateLinkAction,
  useGetShortLink,
} from '@/entities/record'

import DescriptionItem from './description-item'
import QrCodeDialog from './qr-code-dialog'
import SocialShareDialog from './social-share-dialog'

export default function Description({ record }: { record: RecordType }) {
  const shortLink = useGetShortLink(record)
  const router = useRouter()
  const queryClient = useQueryClient()

  const createDt = getFormattedDate(new Date(record.createDt))

  const deleteRecord = async () => {
    const result = await deleteLinkAction({
      linkUid: record.uid,
    })
    if (!result?.data || 'failure' in result.data) {
      toast({
        title: 'Error while deleting',
        description: result?.data?.failure,
        variant: 'destructive',
      })
      return
    }
    router.push('/main')
  }

  const switchRecordStatus = async () => {
    const result = await updateLinkAction({
      uid: record.uid,
      title: record.title,
      password: record.password,
      tag: record.tags[0] ?? '',
      isEnable: !record.isEnable,
    })

    if (!result?.data || 'failure' in result.data) {
      toast({
        title: 'Error while updating',
        description: result?.data?.failure,
        variant: 'destructive',
      })
      return
    }

    await queryClient.invalidateQueries({ queryKey: ['currentRecord'] })
    await queryClient.invalidateQueries({ queryKey: ['records'] })
    toast({
      title: 'Successfully updated',
    })
  }

  return (
    <div className="w-full space-y-4 border-b pb-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="size-14">
            <AvatarImage
              src={`http://www.google.com/s2/favicons?domain=${record.urls[0] ?? ''}`}
              alt="avatar"
            />
            <AvatarFallback>{record.title[0]}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <h2 className="truncate text-2xl font-semibold tracking-tight">
                {record.title}
              </h2>
              <Badge className="mt-px">
                {record.type === RecordTypesEnum.SINGLE ? 'Single' : 'Group'}
              </Badge>
            </div>
            <Link
              href={shortLink}
              target="_blank"
              className="truncate text-sm text-muted-foreground hover:underline hover:underline-offset-4"
            >
              {shortLink}
            </Link>
          </div>
        </div>
        <div className="flex gap-2">
          <Button className="hidden xl:flex" asChild>
            <Link href={shortLink} target="_blank">
              <EyeIcon className="mr-2 size-4" />
              Preview
            </Link>
          </Button>
          <QrCodeDialog link={shortLink}>
            <Button className="hidden lg:flex">
              <QrCodeIcon className="mr-2 size-4" />
              QR code
            </Button>
          </QrCodeDialog>
          <SocialShareDialog shortLink={shortLink}>
            <Button className="hidden xl:flex">
              <ArrowUpOnSquareIcon className="mr-2 size-4" />
              Share
            </Button>
          </SocialShareDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <EllipsisHorizontalIcon className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="xl:hidden" asChild>
                <Link href={shortLink} target="_blank">
                  <EyeIcon className="mr-2 size-4" />
                  Preview
                </Link>
              </DropdownMenuItem>
              <QrCodeDialog link={shortLink}>
                <DropdownMenuItem
                  className="lg:hidden"
                  onSelect={(e) => {
                    e.preventDefault()
                  }}
                >
                  <QrCodeIcon className="mr-2 size-4" />
                  QR code
                </DropdownMenuItem>
              </QrCodeDialog>
              <SocialShareDialog shortLink={shortLink}>
                <DropdownMenuItem
                  className="xl:hidden"
                  onSelect={(e) => {
                    e.preventDefault()
                  }}
                >
                  <ArrowUpOnSquareIcon className="mr-2 size-4" />
                  Share
                </DropdownMenuItem>
              </SocialShareDialog>
              <DropdownMenuItem onClick={switchRecordStatus}>
                <HandRaisedIcon className="mr-2 size-4" />
                <span>{record.isEnable ? 'Disable' : 'Enable'}</span>
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
          {record.tags[0] ? (
            <Badge>{record.tags[0]}</Badge>
          ) : (
            <span>No tag</span>
          )}
        </DescriptionItem>
        <DescriptionItem title="Status" Icon={Squares2X2Icon}>
          {record.isEnable ? (
            <div className="flex w-fit items-center gap-2 overflow-hidden rounded-xl border border-green-300 bg-green-100/[.2] px-3 dark:border-green-600 dark:bg-green-900/[.2]">
              <div className="size-2 rounded-full bg-green-600" />
              <span className="text-green-700">Ready</span>
            </div>
          ) : (
            <div className="flex w-fit items-center gap-2 overflow-hidden rounded-xl border border-red-300 bg-red-100/[.2] px-3 dark:border-red-600 dark:bg-red-900/[.2]">
              <div className="size-2 rounded-full bg-red-600" />
              <span className="text-red-700">Disabled</span>
            </div>
          )}
        </DescriptionItem>
        <DescriptionItem title="Urls" Icon={LinkIcon}>
          {record.type == RecordTypesEnum.SINGLE ? (
            <Button variant="link" className="h-6 p-0" asChild>
              <Link href={record.urls[0] ?? ''} target="_blank">
                {record.urls[0]}
              </Link>
            </Button>
          ) : (
            <Badge>{record.urls.length} urls</Badge>
          )}
        </DescriptionItem>
        <DescriptionItem title="Created" Icon={CalendarIcon}>
          {createDt}
        </DescriptionItem>
      </div>
    </div>
  )
}
