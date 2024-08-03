'use client'

import { TrashIcon } from '@heroicons/react/24/solid'
import { Button } from '@repo/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@repo/ui/table'
import { useToast } from '@repo/ui/use-toast'
import { useQueryClient } from '@tanstack/react-query'

import { deleteDomainAction, useGetClientDomains } from '@/entities/domain'

export default function DomainsTable() {
  const { data } = useGetClientDomains()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const deleteDomain = async (uuid: string) => {
    const result = await deleteDomainAction({
      uuid,
    })

    if (!result || !result.data || 'failure' in result.data) {
      toast({
        title: 'Error while deleting',
        description: result?.data?.failure,
        variant: 'destructive',
      })
      return
    }

    queryClient.invalidateQueries({ queryKey: ['domains'] })
    toast({
      title: 'Successfully deleted',
    })
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
          {data?.map((item, index) => (
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
