import ky from 'ky'

import { ExternalRefResponseType } from '@/shared/ExternalRefResponseType'
import { BACKEND_DOMAIN } from '@/shared/urls'

const getLinkByInnerRef = async (
  innerRef: string,
  clientUID: string
): Promise<ExternalRefResponseType> => {
  const options = {
    headers: {
      CLIENT_UID: clientUID,
    },
  }
  return ky
    .get(`${BACKEND_DOMAIN}/shorty/api/v1/redirect/${innerRef}`, options)
    .json()
}

export default getLinkByInnerRef
