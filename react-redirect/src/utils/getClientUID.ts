import { v4 as uuidv4 } from 'uuid'

const getClientUID = () => {
  const storedClientUID = localStorage.getItem('CLIENT_UID')
  if (storedClientUID) return storedClientUID
  const newClientUID = uuidv4()
  localStorage.setItem('CLIENT_UID', newClientUID)
  return newClientUID
}

export default getClientUID
