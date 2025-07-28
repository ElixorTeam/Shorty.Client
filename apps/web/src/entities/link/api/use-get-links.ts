import { rqClient } from '@/shared/api'

import { parseLink } from './parse-link'

const useGetLinks = () =>
  rqClient.useQuery(
    'get',
    '/user/links',
    {},
    {
      select: (response) => response.data.map(parseLink),
    }
  )

export { useGetLinks }
