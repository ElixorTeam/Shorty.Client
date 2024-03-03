import { useMemo } from 'react'

// eslint-disable-next-line no-restricted-imports
import useGetDomains from '@/entities/domain/use-get-domains'

import getShortLink from './get-short-link'
import { RecordType } from './record-type'

const useGetShortLink = (record: RecordType) => {
  const { data: domains } = useGetDomains()

  return useMemo(() => {
    if (!record || !domains) return ''
    const domain = domains.find((item) => item.uid === record.domainUid)
    return getShortLink({
      subdomain: record.subdomain,
      domain: domain?.value,
      path: '',
    })
  }, [record, domains])
}

export default useGetShortLink
