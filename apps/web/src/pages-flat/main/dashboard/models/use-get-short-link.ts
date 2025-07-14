import { useMemo } from 'react'

import { rqClient } from '@/shared/api/instance'

const useGetShortLink = ({ linkUid }: { linkUid: string }) => {
  const { data: linkResponse } = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: linkUid } },
  })

  const { data: domainsResponse } = rqClient.useQuery('get', '/user/subdomains')

  const shortLink = useMemo(() => {
    if (!linkResponse?.data || !domainsResponse?.data) return undefined

    const { domainUid, subdomainUid, path = '' } = linkResponse.data

    const domainItem = domainsResponse.data.find(
      (item) => item.domainUid === domainUid
    )
    if (!domainItem) return undefined

    const subdomainItem = domainItem.subdomains.find(
      (item) => item.uid === subdomainUid
    )

    const domain = domainItem.domainValue ?? ''
    const subdomain = subdomainItem?.value ?? ''
    const protocol = domain.includes('localhost') ? 'http://' : 'https://'

    return `${protocol}${subdomain}${domain}/${path}`
  }, [linkResponse, domainsResponse])

  return shortLink
}

export default useGetShortLink
