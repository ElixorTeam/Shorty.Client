import { rqClient } from '@/shared/api/instance'
import { ApiSchemas } from '@/shared/api/schema'

export function useUpdateLink() {
  const updateMutation = rqClient.useMutation('put', '/user/links/{id}')
  const update = async (data: ApiSchemas['RecordUpdateRequest']) =>
    updateMutation.mutateAsync({
      params: { path: { id: data.uid } },
      body: data,
    })
  const errorMessage = updateMutation.isError
    ? updateMutation.error.message
    : undefined
  return {
    update,
    isPending: updateMutation.isPending,
    errorMessage,
  }
}
