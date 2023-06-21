import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { getLinkByInnerRef } from '@/utils/api'
import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'

const LINK_REF_PATTERN = /^[a-zA-Z0-9]{3,10}$/

const isValidRef = (ref: string): boolean => LINK_REF_PATTERN.test(ref)

function RedirectLink({ linkRef }: { linkRef: string }) {
  const { data, error, isLoading } = useSWR<ExternalRefResponseType, Error>(
    linkRef,
    getLinkByInnerRef,
    { shouldRetryOnError: false }
  )

  useEffect(() => {
    if (data) window.location.href = data.externalRef
  }, [data])

  if (error) return <p>Error: {error.message}</p>
  if (isLoading || !data) return <p>Loading...</p>
  return <p>Redirecting...</p>
}

export default function Redirect() {
  const { linkRef } = useParams()
  if (!linkRef || !isValidRef(linkRef))
    return <p>Enter a link reference in the URL (e.g. /abc12)</p>
  return <RedirectLink linkRef={linkRef} />
}
