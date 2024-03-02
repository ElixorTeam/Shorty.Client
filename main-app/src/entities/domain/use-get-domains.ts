import { useQuery } from '@tanstack/react-query'

import getDomains from '@/entities/domain/get-domains'

const useGetDomains = () =>
  useQuery({
    queryFn: async () => getDomains(),
    queryKey: ['domains'],
  })

export default useGetDomains
