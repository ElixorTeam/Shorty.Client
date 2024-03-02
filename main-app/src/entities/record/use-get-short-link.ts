import { useMemo } from 'react'

import useGetDomains from '@/entities/domain/use-get-domains'
import { RecordType } from '@/entities/record/record-type'

const useGetShortLink = (record: RecordType) => {
  const { data: domains } = useGetDomains()

  return useMemo(() => {
    if (!record || !domains) return ''
    const domain = domains.find((item) => item.uid === record.domainUid)
    const subdomain = record.subdomain.trim()
    const path = ''
    return `https://${subdomain ? `${subdomain}.` : ''}${domain?.value}${path ? `/${path}` : ''}`
  }, [record, domains])
}

export default useGetShortLink
