import { rqClient } from '@/shared/api'

const useDeleteDomain = () => {
  const deleteMutation = rqClient.useMutation('delete', '/domains/{id}')
  const del = async (uid: string) =>
    deleteMutation.mutateAsync({ params: { path: { id: uid } } })
  return {
    del,
    ...deleteMutation,
  }
}

export { useDeleteDomain }
