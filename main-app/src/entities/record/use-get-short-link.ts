import { useMemo } from 'react'

// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import useGetAllDomains from '@/entities/domain/use-get-all-domains'
// eslint-disable-next-line @conarti/feature-sliced/layers-slices
import { useGetAllSubdomains } from '@/entities/subdomain'

import getShortLink from './get-short-link'
import { RecordType } from './record-type'

const useGetShortLink = (record: RecordType) => {
  const { data: domains } = useGetAllDomains()
  const { data: subdomains } = useGetAllSubdomains(record.domainUid)

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
