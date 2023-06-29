import ky from 'ky'
import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'

const BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN
export const API_URL = `${BACKEND_DOMAIN}/shorty/api/v1`

export const getLinkByInnerRef = async (
  innerRef: string,
  clientUID: string
): Promise<ExternalRefResponseType> => {
  const options = {
    headers: {
      CLIENT_UID: clientUID
    }
  }
  return ky.get(`${API_URL}/redirect/${innerRef}`, options).json()
}
