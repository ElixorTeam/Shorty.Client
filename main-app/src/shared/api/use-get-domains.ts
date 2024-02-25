import { useQuery } from '@tanstack/react-query'

import getDomains from '@/shared/api/get-domains'

const useGetRecords = () =>
  useQuery({
    queryFn: async () => getDomains(),
    queryKey: ['domains'],
  })

export default useGetRecords
