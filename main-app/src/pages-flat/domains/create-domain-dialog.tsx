'use client'

import { useSignal } from '@preact-signals/safe-react'

import CreateDomainForm from '@/features/create-domain-form'
import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'

export default function CreateDomainDialog() {
  const open = useSignal<boolean>(false)
  return (
    <Dialog
      open={open.value}
      onOpenChange={(value) => {
        open.value = value
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
            open.value = false
          }}
        />
      </DialogContent>
    </Dialog>
  )
}
