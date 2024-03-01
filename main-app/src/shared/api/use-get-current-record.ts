import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

import getCurrentRecord from '@/shared/api/get-current-record'

const useGetCurrentRecord = () => {
  const searchParams = useSearchParams()
  const linkUid = searchParams.get('linkUid')
  return useQuery({
    queryFn: async () => getCurrentRecord(linkUid ?? ''),
    queryKey: ['currentRecord', linkUid],
  })
}

export default useGetCurrentRecord
