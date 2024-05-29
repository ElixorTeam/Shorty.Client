import { useQuery } from '@tanstack/react-query'

import getClientDomains from './get-client-domains'

const useGetClientDomains = () =>
  useQuery({
    queryFn: async () => getClientDomains(),
    queryKey: ['domains'],
  })

export default useGetClientDomains
