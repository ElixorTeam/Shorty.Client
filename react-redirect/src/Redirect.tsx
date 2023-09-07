import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import getLinkByInnerRef from '@/utils/api'
import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'
import getClientUID from '@/utils/localStorage'

const LINK_REF_PATTERN = /^[a-zA-Z0-9]{3,10}$/

const isValidRef = (ref: string): boolean => LINK_REF_PATTERN.test(ref)

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center">
      <div className="rounded-full w-5 h-5 border-2 border-gray-300 border-r-transparent animate-spin" />
    </div>
  )
}

function RedirectLink({
  linkRef,
  clientUID
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

  if (error) {
    return (
      <div className="flex items-center">
        <h1 className="mr-5 pr-5 text-2xl font-medium border-r leading-10 border-gray-300 dark:border-white/[.3]">
          404
        </h1>
        <h2 className="text-sm">This page could not be found.</h2>
      </div>
    )
  }
  if (isLoading || !data) {
    return (
      <div className="flex items-center gap-4">
        <LoadingSpinner />
        <p className="animate-pulse">Loading...</p>
      </div>
    )
  }
  return <p className="animate-pulse">Redirecting...</p>
}

export default function Redirect() {
  const { linkRef } = useParams()
  const clientUID = getClientUID()
  return (
    <div className="w-screen h-screen flex items-center justify-center dark:bg-black dark:text-white">
      {!linkRef || !isValidRef(linkRef) ? (
        <p>Enter a link reference in the URL (e.g. /abc12)</p>
      ) : (
        <RedirectLink linkRef={linkRef} clientUID={clientUID} />
      )}
    </div>
  )
}
