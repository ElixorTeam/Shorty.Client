'use client'

import { ColumnDef } from '@tanstack/react-table'
import { TrashIcon } from 'lucide-react'

import { DeleteDomainButton } from '@/features/domain/delete'
import { type ApiSchemas } from '@/shared/api'

export const domainsTableColumns: ColumnDef<ApiSchemas['Domain']>[] = [
  {
    accessorKey: 'uid',
    header: 'ID',
  },
  {
    accessorKey: 'value',
    header: 'Hostname',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <div className="flex justify-end">
          <DeleteDomainButton
            variant="secondary"
            size="icon"
            domainUid={row.original.uid}
            className="size-7"
          >
            <TrashIcon />
          </DeleteDomainButton>
        </div>
      )
    },
  },
]
