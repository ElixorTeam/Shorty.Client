import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import CreateLinkForm from './create-link-form'

export default function CreateLinkDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">New</Button>
      </DialogTrigger>
      <DialogContent className="max-h-[95%] max-w-md overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create new link</DialogTitle>
        </DialogHeader>
        <CreateLinkForm />
      </DialogContent>
    </Dialog>
  )
}
