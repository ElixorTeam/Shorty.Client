import { useQuery } from '@tanstack/react-query'

import getAllTags from './get-all-tags'

const useGetAllTags = () =>
  useQuery({
    queryFn: async () => getAllTags(),
    queryKey: ['tags'],
  })

export default useGetAllTags
