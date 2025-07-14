import CreateDomainDialog from './create-domain-dialog'
import DomainsTable from './domains-table'

export default async function DomainsPage() {
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
