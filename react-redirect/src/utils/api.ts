import ky from 'ky'
import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'

const ENV_API = import.meta.env.VITE_BACKEND_DOMAIN
export const API_URL = `${ENV_API}/shorty/api/v1`

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
