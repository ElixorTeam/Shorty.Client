import { useQuery } from '@tanstack/react-query'

import getDomains from './get-domains'

const useGetAllDomains = () =>
  useQuery({
    queryFn: async () => getDomains(),
    queryKey: ['domains'],
  })

export default useGetAllDomains
