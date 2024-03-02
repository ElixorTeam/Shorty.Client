import { useMemo } from 'react'

import { ApiRecordType } from '@/shared/api/api-record-type'
import useGetDomains from '@/shared/api/use-get-domains'

const useShortLink = (record: ApiRecordType) => {
  const { data: domains } = useGetDomains()

  return useMemo(() => {
    if (!record || !domains) return ''
    const domain = domains.find((item) => item.uid === record.domainUid)
    const subdomain = record.subdomain.trim()
    const path = ''
    return `https://${subdomain ? `${subdomain}.` : ''}${domain?.value}${path ? `/${path}` : ''}`
  }, [record, domains])
}

export default useShortLink
