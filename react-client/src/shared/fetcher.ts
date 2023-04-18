'use client'
import useSWR from 'swr'
import { LinkRecordType } from '@/shared/LinkRecordType'

export const apiURL = 'http://localhost:8082/shorty/api'

const fetcher = (
  url: string,
  init?: { [key: string]: string | { [key: string]: string } }
) => {
  if (init === null) init = {}
  return fetch(url, init)
    .then(res => res.json())
    .catch(err => console.log(err))
}

const postFetch = (ref: string, data: LinkRecordType) =>
  fetcher(apiURL + ref, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  })

const getFetch = (ref: string) => fetcher(apiURL + ref)

const deleteFetch = (ref: string) => fetcher(apiURL + ref, { method: 'POST' })

export function usePostLink(linkData: LinkRecordType) {
  const { data, error, isLoading } = useSWR(['/links/', linkData], postFetch)
  return { data, error, isLoading }
}

export function useGetLinks() {
  const { data, error, isLoading } = useSWR<LinkRecordType[] | [], Error>(
    '/links/',
    getFetch
  )
  return { data, error, isLoading }
}

export function useGetLinkByRef(ref: string) {
  const { data, error, isLoading } = useSWR<LinkRecordType, Error>(
    '/links/route_ref/' + ref,
    getFetch
  )
  return { data, error, isLoading }
}

export function useDeleteLinks(uuid: string) {
  const { data, error, isLoading } = useSWR('/links/' + uuid, deleteFetch)
  return { data, error, isLoading }
}
