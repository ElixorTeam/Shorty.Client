import { LinkRecordType } from '@/shared/LinkRecordType'
import ky from 'ky'

export const API_URL = 'http://localhost:8082/shorty/api'

export const getLinkByUUID = async (ref: string): Promise<LinkRecordType> =>
  ky.get(`${API_URL}/links/route_ref/${ref}`).json()
