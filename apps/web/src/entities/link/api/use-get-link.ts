import { rqClient } from '@/shared/api'

import { parseLink } from './parse-link'

const useGetLink = (uid: string) =>
  rqClient.useQuery(
    'get',
    '/user/links/{id}',
    {
      params: { path: { id: uid } },
    },
    {
      select: (response) => parseLink(response.data),
    }
  )

export { useGetLink }
