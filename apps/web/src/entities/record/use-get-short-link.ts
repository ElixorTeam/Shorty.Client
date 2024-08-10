import { useMemo } from 'react'

import { useGetClientDomains } from '@/entities/domain'
import { useGetAllSubdomains } from '@/entities/subdomain'

import getShortLink from './get-short-link'
import { RecordType } from './record-type'

const useGetShortLink = (record: RecordType) => {
  const { data: domains } = useGetClientDomains()
  const { data: subdomains } = useGetAllSubdomains()

  return useMemo(() => {
    if (!domains) return ''
    const domain = domains.find((item) => item.uid === record.domainUid)
    return getShortLink({
      subdomain:
        subdomains?.find((item) => item.uid === record.subdomainUid)?.value ??
        '',
      domain: domain?.value,
      path: record.path,
    })
  }, [record, domains, subdomains])
}

export default useGetShortLink
