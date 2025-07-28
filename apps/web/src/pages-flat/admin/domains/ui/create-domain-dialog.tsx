'use client'

import { Button } from '@repo/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@repo/ui/dialog'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

import { CreateDomainForm } from '@/features/domain/create'

export function CreateDomainDialog() {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Dialog
      open={open}
      onOpenChange={(value) => {
        setOpen(value)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary" size="icon" className="size-6">
          <PlusIcon className="size-3.5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95%] max-w-sm overflow-y-auto">
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
