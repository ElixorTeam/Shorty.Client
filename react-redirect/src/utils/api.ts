import ky from 'ky'
import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'

export const API_URL = import.meta.env.VITE_API_URL

export const getLinkByInnerRef = async (
  innerRef: string,
  clientUID: string
): Promise<ExternalRefResponseType> => {
  const options = {
    headers: {
      CLIENT_UID: clientUID
    }
  }
  return ky
    .get(
      `${API_URL}/links_analytics/external_ref_by_inner/${innerRef}`,
      options
    )
    .json()
}
