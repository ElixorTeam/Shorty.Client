import { RedirectTypesEnum } from './redirect-types-enum'

export type RedirectResponseType = {
  uid: string
  urls: string[]
  password: string | null
}

export type RedirectType = RedirectResponseType & {
  type: RedirectTypesEnum
}
