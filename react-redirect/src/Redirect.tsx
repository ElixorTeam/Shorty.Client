import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useSWR from 'swr'
import { LinkRecordType } from '@/shared/LinkRecordType'
import { getLinkByUUID } from '@/utils/api'

const LINK_REF_PATTERN = /^[a-zA-Z0-9]{5}$/

const isValidRef = (ref: string): boolean => LINK_REF_PATTERN.test(ref)

function RedirectLink({ linkRef }: { linkRef: string }) {
  const { data, error, isValidating } = useSWR<LinkRecordType, Error>(
    linkRef,
    getLinkByUUID,
    { shouldRetryOnError: false }
  )

  useEffect(() => {
    if (data) window.location.href = data.ref
  }, [data])

  if (error) return <p>Error: {error.message}</p>
  if (isValidating || !data) return <p>Loading...</p>
  return <p>Redirecting...</p>
}

export default function Redirect() {
  const { linkRef } = useParams()
  if (!linkRef || !isValidRef(linkRef))
    return <p>Enter a link reference in the URL (e.g. /abc12)</p>
  return <RedirectLink linkRef={linkRef} />
}
