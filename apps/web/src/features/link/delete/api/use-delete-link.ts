import { rqClient } from '@/shared/api'

const useDeleteLink = () => {
  const deleteLinkMutation = rqClient.useMutation('delete', '/user/links/{id}')
  const resetLinkAnalyticsMutation = rqClient.useMutation(
    'delete',
    '/user/links/{id}/analytics'
  )
  const del = async (uid: string) => {
    await resetLinkAnalyticsMutation.mutateAsync({
      params: { path: { id: uid } },
    })
    await deleteLinkMutation.mutateAsync({ params: { path: { id: uid } } })
  }

  return {
    del,
    isError: deleteLinkMutation.isError || resetLinkAnalyticsMutation.isError,
    isPending:
      deleteLinkMutation.isPending || resetLinkAnalyticsMutation.isPending,
    error: deleteLinkMutation.error ?? resetLinkAnalyticsMutation.error,
  }
}

export { useDeleteLink }
