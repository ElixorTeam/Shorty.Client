import { useQuery } from '@tanstack/react-query'

import getAllSubdomains from './get-all-subdomains'

const useGetAllSubdomains = (domainUid: string) =>
  useQuery({
    queryFn: async () => getAllSubdomains(domainUid),
    queryKey: ['subdomains', { id: domainUid }],
  })

export default useGetAllSubdomains
