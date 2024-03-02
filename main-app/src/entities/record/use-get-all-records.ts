import { useQuery } from '@tanstack/react-query'

import getAllRecords from '@/entities/record/get-all-records'

const useGetAllRecords = () =>
  useQuery({
    queryFn: async () => getAllRecords(),
    queryKey: ['records'],
  })

export default useGetAllRecords
