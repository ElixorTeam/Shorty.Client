import { Button } from '@/shared/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog'
import CreateLinkForm from '@/widgets/create-link-form/create-link-form'

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
