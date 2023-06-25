import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { getLinkByInnerRef } from '@/utils/api'
import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'
import getClientUID from '@/utils/localStorage'

const LINK_REF_PATTERN = /^[a-zA-Z0-9]{3,10}$/

const isValidRef = (ref: string): boolean => LINK_REF_PATTERN.test(ref)

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
      <div className="w-screen h-screen flex items-center justify-center dark:bg-black dark:text-white">
        <div className="flex items-center">
          <h1 className="mr-5 pr-5 text-2xl font-medium border-r leading-10 border-gray-300 dark:border-white/[.3]">
            404
          </h1>
          <h2 className="text-sm">This page could not be found.</h2>
        </div>
      </div>
    )
  }
  if (isLoading || !data) return <p>Loading...</p>
  return <p>Redirecting...</p>
}

export default function Redirect() {
  const { linkRef } = useParams()
  const clientUID = getClientUID()
  if (!linkRef || !isValidRef(linkRef))
    return <p>Enter a link reference in the URL (e.g. /abc12)</p>
  return <RedirectLink linkRef={linkRef} clientUID={clientUID} />
}
