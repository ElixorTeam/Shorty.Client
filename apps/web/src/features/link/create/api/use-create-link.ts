import { type ApiSchemas, rqClient } from '@/shared/api'

export function useCreateLink() {
  const createMutation = rqClient.useMutation('post', '/user/links')
  const create = async (data: ApiSchemas['RecordCreateRequest']) =>
    createMutation.mutateAsync({ body: data })
  return {
    create,
    ...createMutation,
  }
}
