import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@repo/ui/alert-dialog'
import { Button } from '@repo/ui/button'
import { useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { rqClient } from '@/shared/api/instance'
import { ApiSchemas } from '@/shared/api/schema'
import ROUTES from '@/shared/routes'

import { useDeleteLink } from '../models/use-delete-link'

export default function DeleteLinkAction({
  linkUid,
}: Readonly<{ linkUid: string }>) {
  const [open, setOpen] = useState(false)
  const queryClient = useQueryClient()
  const router = useRouter()
  const { del, isPending: isPending } = useDeleteLink()

  const { data } = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: linkUid } },
  })

  const handleDelete = async () => {
    try {
      await del(linkUid)
      setOpen(false)
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/user/links/{id}', {
          params: { path: { id: linkUid } },
        })
      )
      queryClient.setQueryData(
        rqClient.queryOptions('get', '/user/links').queryKey,
        (oldData: { data: ApiSchemas['Record'][] } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            data: oldData.data.filter((link) => link.uid !== linkUid),
          }
        }
      )
      router.push(ROUTES.LINKS)
    } catch {
      toast('Failed to delete link', { description: 'Please try again later.' })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          variant="secondary"
          disabled={isPending || !data?.data}
        >
          <TrashIcon />
          <span className="hidden md:block">Delete</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your link
            and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete} disabled={isPending}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
