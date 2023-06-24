import ky from 'ky'
import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'

export const API_URL = import.meta.env.VITE_API_URL

export const getLinkByInnerRef = async (
  innerRef: string
): Promise<ExternalRefResponseType> =>
  ky.get(`${API_URL}/links/external_ref_by_inner/${innerRef}`).json()
