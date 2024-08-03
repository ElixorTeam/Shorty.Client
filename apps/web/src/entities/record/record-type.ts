import { RecordTypesEnum } from './record-types-enum'

export type RecordResponseType = {
  uid: string
  title: string
  urls: string[]
  path: string
  tags: string[]
  subdomainUid: string
  domainUid: string
  password: string
  isEnable: boolean
  updateDt: string
  createDt: string
}

export type RecordType = RecordResponseType & {
  type: RecordTypesEnum
}
