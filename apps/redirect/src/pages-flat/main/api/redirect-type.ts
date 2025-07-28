export const RedirectTypesEnum = {
  SINGLE: 'single',
  GROUP: 'group',
} as const

export type RedirectResponseType = {
  uid: string
  urls: string[]
  password: string | null
}

export type RedirectType = RedirectResponseType & {
  type: (typeof RedirectTypesEnum)[keyof typeof RedirectTypesEnum]
}
