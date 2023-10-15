export const enum SortKeyEnum {
  Name = 'name',
  Date = 'date',
  View = 'view',
}

export const sortOptions: SortOptionsType[] = [
  { id: 1, label: 'By name', value: SortKeyEnum.Name },
  { id: 2, label: 'By date', value: SortKeyEnum.Date },
  { id: 3, label: 'By views', value: SortKeyEnum.View },
]

export type SortOptionsType = {
  id: number
  label: string
  value: SortKeyEnum
}
