'use client'

import { Button } from '@repo/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/table'
import { useQueryClient } from '@tanstack/react-query'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'

import { rqClient } from '@/shared/api/instance'

export default function DomainsTable() {
  const { data } = rqClient.useQuery('get', '/domains')
  const queryClient = useQueryClient()

  const deleteDomain = async (uuid: string) => {
    toast('form error')
    // const result = await deleteDomainAction({
    //   uuid,
    // })

    // if (!result?.data || 'failure' in result.data) {
    //   toast('Error while deleting', {
    //     description: result?.data?.failure,
    //   })
    //   return
    // }

    // await queryClient.invalidateQueries({ queryKey: ['domains'] })
    // toast('Successfully deleted')
  }
  return (
    <div className="w-full overflow-hidden rounded-md border">
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Control</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{item.value}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteDomain(item.uid)}
                >
                  <TrashIcon className="size-5" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
