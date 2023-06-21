import ky from 'ky'
import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'

export const API_URL = 'http://localhost:8082/shorty/api/v1'

export const getLinkByInnerRef = async (
  innerRef: string
): Promise<ExternalRefResponseType> =>
  ky.get(`${API_URL}/external_ref_by_inner/${innerRef}`).json()
