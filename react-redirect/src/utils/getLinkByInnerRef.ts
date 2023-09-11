import ky from 'ky'

import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'
import { BACKEND_API } from '@/shared/urls'

const getLinkByInnerRef = async (
  innerRef: string,
  clientUID: string
): Promise<ExternalRefResponseType> => {
  const options = {
    headers: {
      CLIENT_UID: clientUID,
    },
  }
  return ky.get(`${BACKEND_API}/redirect/${innerRef}`, options).json()
}

export default getLinkByInnerRef
