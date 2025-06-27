'use client'

import { Button } from '@repo/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog'

import { CreateLinkForm, FormProvider } from '@/features/create-link-form'
import { useState } from 'react'

export default function CreateLinkDialog() {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">New</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95%] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create new link</DialogTitle>
        </DialogHeader>
        <FormProvider>
          <CreateLinkForm
            onFormSubmit={() => {
              setOpen(false)
            }}
          />
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
