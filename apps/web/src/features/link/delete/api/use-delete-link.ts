import { rqClient } from '@/shared/api'

const useDeleteLink = () => {
  const deleteMutation = rqClient.useMutation('delete', '/user/links/{id}')
  const del = async (uid: string) =>
    deleteMutation.mutateAsync({ params: { path: { id: uid } } })
  return {
    del,
    ...deleteMutation,
  }
}

export { useDeleteLink }
