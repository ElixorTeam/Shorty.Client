'use client'

import { TrashIcon } from '@heroicons/react/24/solid'
import { useQueryClient } from '@tanstack/react-query'

import { deleteDomainAction, useGetAllDomains } from '@/entities/domain'
import { Button } from '@/shared/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table'
import { useToast } from '@/shared/ui/use-toast'

export default function DomainsTable() {
  const { data } = useGetAllDomains()
  const { toast } = useToast()
  const queryClient = useQueryClient()

  const deleteDomain = async (uuid: string) => {
    const { data, serverError, validationErrors } = await deleteDomainAction({
      uuid,
    })
    if (data?.failure || serverError || validationErrors) {
      toast({
        title: 'Error while updating',
        description: data?.failure,
        variant: 'destructive',
      })
      return
    }
    queryClient.invalidateQueries({ queryKey: ['domains'] })
    toast({
      title: 'Successfully updated',
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
