import { useQuery } from '@tanstack/react-query'

import getAllSubdomains from './get-all-subdomains'

const useGetAllSubdomains = () =>
  useQuery({
    queryFn: async () => getAllSubdomains(),
    queryKey: ['subdomains'],
  })

export default useGetAllSubdomains
