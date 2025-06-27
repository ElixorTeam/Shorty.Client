'use client'

import { Button } from '@repo/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog'

import CreateDomainForm from '@/features/create-domain-form'
import { useState } from 'react'

export default function CreateDomainDialog() {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95%] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create new domain</DialogTitle>
        </DialogHeader>
        <CreateDomainForm
          onFormSubmit={() => {
            setOpen(false)
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
