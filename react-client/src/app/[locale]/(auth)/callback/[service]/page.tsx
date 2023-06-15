'use client'

import { useSearchParams } from 'next/navigation'
import ky from 'ky'

// TODO auth token
export default function Callback({ params }: { params: { service: string } }) {
  const searchParams = useSearchParams()
  const code = searchParams.get('code')
  ky.post('http://localhost:8082/shorty/oauth2/token', {
    json: { code }
  })
    .then(req => console.log(req))
    .catch(error => console.log(error))

  return (
    <p>
      Text {params.service} {code}
    </p>
  )
}
