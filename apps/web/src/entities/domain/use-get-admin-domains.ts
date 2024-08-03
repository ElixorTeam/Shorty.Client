import { useQuery } from '@tanstack/react-query'

import getAdminDomains from './get-admin-domains'

const useGetClientDomains = () =>
  useQuery({
    queryFn: async () => getAdminDomains(),
    queryKey: ['domains'],
  })

export default useGetClientDomains
