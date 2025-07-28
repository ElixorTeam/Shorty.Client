import { ApiSchemas, rqClient } from '@/shared/api'

const useCreateDomain = () => {
  const createMutation = rqClient.useMutation('post', '/domains')
  const create = async (data: ApiSchemas['CreateDomainRequest']) =>
    createMutation.mutateAsync({ body: data })
  return {
    create,
    ...createMutation,
  }
}

export { useCreateDomain }
