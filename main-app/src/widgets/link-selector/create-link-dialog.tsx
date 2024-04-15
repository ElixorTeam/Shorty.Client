'use client'

import { useSignal } from '@preact-signals/safe-react'

import CreateLinkForm from '@/features/create-link-form'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'

export default function CreateLinkDialog() {
  const open = useSignal<boolean>(false)
  return (
    <Dialog
      open={open.value}
      onOpenChange={(value) => {
        open.value = value
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">New</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95%] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create new link</DialogTitle>
        </DialogHeader>
        <CreateLinkForm
          onFormSubmit={() => {
            open.value = false
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
