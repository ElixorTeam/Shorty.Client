export enum RedirectTypesEnum {
  SINGLE = 'single',
  GROUP = 'group',
}

export type RedirectResponseType = {
  uid: string
  urls: string[]
  password: string | null
}

export type RedirectType = RedirectResponseType & {
  type: RedirectTypesEnum
}
