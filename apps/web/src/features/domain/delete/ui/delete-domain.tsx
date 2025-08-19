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
import { useState } from 'react'
import { toast } from 'sonner'

import { type ApiSchemas, rqClient } from '@/shared/api'

import { useDeleteDomain } from '../api/use-delete-domain'

export function DeleteDomainButton({
  domainUid,
  onSuccess,
  ...props
}: { domainUid: string; onSuccess?: () => void } & React.ComponentProps<
  typeof Button
>) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)
  const { del, isPending: isPending } = useDeleteDomain()

  const handleDelete = async () => {
    try {
      await del(domainUid)
      setOpen(false)
      queryClient.setQueryData(
        rqClient.queryOptions('get', '/domains', {}).queryKey,
        (oldData: { data: ApiSchemas['Domain'][] } | undefined) => {
          if (!oldData) return oldData
          return {
            ...oldData,
            data: oldData.data.filter((item) => item.uid !== domainUid),
          }
        }
      )
      onSuccess?.()
    } catch {
      toast('Failed to delete domain', {
        description: 'Please try again later.',
      })
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button disabled={isPending} {...props} />
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
