'use client'

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
import { useState } from 'react'
import { toast } from 'sonner'

import { type ApiSchemas, rqClient } from '@/shared/api'

import { useDeleteLink } from '../api/use-delete-link'

export function DeleteLinkButton({
  linkUid,
  onSuccess,
  ...props
}: { linkUid: string; onSuccess?: () => void } & React.ComponentProps<
  typeof Button
>) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { del, isPending: isPending } = useDeleteLink()

  const handleDelete = async () => {
    try {
      await del(linkUid)
      setOpen(false)
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
      onSuccess?.()
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/user/links/{id}', {
          params: { path: { id: linkUid } },
        })
      )
      await queryClient.invalidateQueries(
        rqClient.queryOptions('get', '/user/links')
      )
    } catch {
      toast('Failed to delete link', { description: 'Please try again later.' })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="secondary" disabled={isPending} {...props}>
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
