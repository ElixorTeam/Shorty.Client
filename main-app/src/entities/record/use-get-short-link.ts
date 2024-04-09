import { useMemo } from 'react'

// eslint-disable-next-line no-restricted-imports
import useGetDomains from '@/entities/domain/use-get-domains'
import { useGetAllSubdomains } from '@/entities/subdomain'

import getShortLink from './get-short-link'
import { RecordType } from './record-type'

const useGetShortLink = (record: RecordType) => {
  const { data: domains } = useGetDomains()
  const { data: subdomains } = useGetAllSubdomains(record.subdomainUid)

  return useMemo(() => {
    if (!record || !domains) return ''
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
