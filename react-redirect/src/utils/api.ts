import ky from 'ky'
import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'

const BACKEND_DOMAIN = import.meta.env.VITE_BACKEND_DOMAIN

const getLinkByInnerRef = async (
  innerRef: string,
  clientUID: string
): Promise<ExternalRefResponseType> => {
  const options = {
    headers: {
      CLIENT_UID: clientUID
    }
  }
  return ky
    .get(`${BACKEND_DOMAIN}/shorty/api/v1/redirect/${innerRef}`, options)
    .json()
}

export default getLinkByInnerRef
