// eslint-disable-next-line import/prefer-default-export
export const enum SortKeyEnum {
  Name = 'name',
  Date = 'date'
}

export const sortOptions: SortOptionsType[] = [
  { id: 1, label: 'sortKeyName', value: 'name' },
  { id: 2, label: 'sortKeyDate', value: 'date' }
]

export type SortOptionsType = {
  id: number
  label: string
  value: string
}
