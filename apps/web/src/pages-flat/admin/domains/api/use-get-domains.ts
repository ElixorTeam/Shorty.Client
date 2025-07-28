import { rqClient } from '@/shared/api'

export const useGetDomains = () => {
  return rqClient.useQuery(
    'get',
    '/domains',
    {},
    { select: (data) => data.data }
  )
}
