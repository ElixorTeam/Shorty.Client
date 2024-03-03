import { useMemo } from 'react'

import useGetDomains from '@/entities/domain/use-get-domains'
import getShortLink from '@/entities/record/get-short-link'
import { RecordType } from '@/entities/record/record-type'

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
