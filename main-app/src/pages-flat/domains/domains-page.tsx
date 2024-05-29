import { QueryClient } from '@tanstack/react-query'

import { getDomains } from '@/entities/domain'

import CreateDomainDialog from './create-domain-dialog'
import DomainsTable from './domains-table'

export default async function DomainsPage() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryFn: getDomains,
    queryKey: ['domains'],
  })

  return (
    <div className="size-full p-4">
      <div className="mb-2 flex items-center gap-2">
        <h2 className="text-2xl font-bold">Domains</h2>
        <CreateDomainDialog />
      </div>
      <DomainsTable />
    </div>
  )
}
