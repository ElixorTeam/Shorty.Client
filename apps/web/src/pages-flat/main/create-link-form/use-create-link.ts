import { rqClient } from '@/shared/api/instance'
import { ApiSchemas } from '@/shared/api/schema'

export function useCreateLink() {
  const createMutation = rqClient.useMutation('post', '/user/links')
  const create = async (data: ApiSchemas['RecordCreateRequest']) =>
    createMutation.mutateAsync({ body: data })
  const errorMessage = createMutation.isError
    ? createMutation.error.message
    : undefined
  return {
    create,
    isPending: createMutation.isPending,
    errorMessage,
  }
}
