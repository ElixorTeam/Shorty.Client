import { LinkRecordType } from '@/shared/LinkRecordType'

export const API_URL = 'http://localhost:8082/shorty/api'

export const getLinkByUUID = async (ref: string): Promise<LinkRecordType> => {
  return await fetch(`${API_URL}/links/route_ref/${ref}`).then(req => {
    if (!req.ok) throw new Error(`${req.status} ${req.statusText}`)
    return req.json()
  })
}
