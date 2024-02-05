export const SortKey = {
  NAME: 'name',
  DATE: 'date',
  VIEWS: 'views',
  TYPE: 'type',
}

export const sortOptions: SortOptionsType[] = [
  { id: 1, label: 'By name', value: SortKey.NAME },
  { id: 2, label: 'By date', value: SortKey.DATE },
  { id: 3, label: 'By views', value: SortKey.VIEWS },
  { id: 4, label: 'By type', value: SortKey.TYPE },
]

export type SortKeyType = (typeof SortKey)[keyof typeof SortKey]

export type SortOptionsType = {
  id: number
  label: string
  value: SortKeyType
}
