import { useMemo } from 'react'

import { rqClient } from '@/shared/api'
import { createUrl } from '@/shared/lib/url'

const useGetLinkUrl = (uid: string) => {
  const linkQuery = rqClient.useQuery('get', '/user/links/{id}', {
    params: { path: { id: uid } },
  })
  const domainQuery = rqClient.useQuery('get', '/user/subdomains')

  const url = useMemo(() => {
    if (!linkQuery.data?.data || !domainQuery.data?.data) return undefined

    const { domainUid, subdomainUid, path = '' } = linkQuery.data.data
    const domainItem = domainQuery.data.data.find(
      (item) => item.domainUid === domainUid
    )
    if (!domainItem) return undefined

    const subdomainItem = domainItem.subdomains.find(
      (item) => item.uid === subdomainUid
    )
    return createUrl(domainItem.domainValue, subdomainItem?.value, path)
  }, [linkQuery, domainQuery])

  return { url, isLoading: linkQuery.isLoading || domainQuery.isLoading }
}

export { useGetLinkUrl }
