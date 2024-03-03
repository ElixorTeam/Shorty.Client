import { useQuery } from '@tanstack/react-query'

import getDomains from './get-domains'

const useGetDomains = () =>
  useQuery({
    queryFn: async () => getDomains(),
    queryKey: ['domains'],
  })

export default useGetDomains
