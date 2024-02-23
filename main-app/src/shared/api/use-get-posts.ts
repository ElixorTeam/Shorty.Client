import { useQuery } from '@tanstack/react-query'
import getRecords from '@/shared/api/get-records'

const useGetRecords = () =>
  useQuery({
    queryFn: async () => getRecords(),
    queryKey: ['records'],
  })

export default useGetRecords
