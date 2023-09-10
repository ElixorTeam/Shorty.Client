import { v4 as uuidv4 , validate as uuidValidate } from 'uuid'

const getClientUID = () => {
  const storedClientUID = localStorage.getItem('CLIENT_UID') ?? ''
  if (uuidValidate(storedClientUID)) return storedClientUID
  const newClientUID = uuidv4()
  localStorage.setItem('CLIENT_UID', newClientUID)
  return newClientUID
}

export default getClientUID
