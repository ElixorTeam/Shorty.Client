import { rqClient } from '@/shared/api/instance'

export function useDeleteLink() {
  const deleteMutation = rqClient.useMutation('delete', '/user/links/{id}')
  const del = async (uid: string) =>
    deleteMutation.mutateAsync({ params: { path: { id: uid } } })
  const errorMessage = deleteMutation.isError
    ? deleteMutation.error.message
    : undefined
  return {
    del,
    isPending: deleteMutation.isPending,
    errorMessage,
  }
}
