import { type ApiSchemas, rqClient } from '@/shared/api'

const useUpdateLink = () => {
  const updateMutation = rqClient.useMutation('put', '/user/links/{id}')
  const update = async (data: ApiSchemas['RecordUpdateRequest']) =>
    updateMutation.mutateAsync({
      params: { path: { id: data.uid } },
      body: data,
    })
  return {
    update,
    ...updateMutation,
  }
}

export default useUpdateLink
