import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'

import ErrorPage from '@/components/ErrorPage'
import LoadingPage from '@/components/LoadingPage'
import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'
import getLinkByInnerRef from '@/utils/api'
import isValidRef from '@/utils/checkIsValidRef'
import getClientUID from '@/utils/getClientUID'

function RedirectLink({
  linkRef,
  clientUID,
}: {
  linkRef: string
  clientUID: string
}) {
  const { data, error, isLoading } = useSWR<ExternalRefResponseType, Error>(
    linkRef,
    (innerRef: string) => getLinkByInnerRef(innerRef, clientUID),
    { shouldRetryOnError: false }
  )
  useEffect(() => {
    if (data) window.location.href = data.externalRef
  }, [data])

  if (error) return <ErrorPage />
  if (isLoading || !data) return <LoadingPage />
  return <p className="animate-pulse">Redirecting...</p>
}

export default function Redirect() {
  const { linkRef } = useParams()
  return (
    <div className="flex h-screen w-screen items-center justify-center dark:bg-black dark:text-white">
      {!linkRef || !isValidRef(linkRef) ? (
        <p>Enter a link reference in the URL (e.g. /abc12)</p>
      ) : (
        <RedirectLink linkRef={linkRef} clientUID={getClientUID()} />
      )}
    </div>
  )
}
