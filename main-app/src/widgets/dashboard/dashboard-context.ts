import { signal } from '@preact-signals/safe-react'

export enum TimePeriodsEnum {
  AllTime = 0,
  Year = 1,
  Month = 2,
  Day = 3,
}

export const timePeriodsList = [
  { id: TimePeriodsEnum.AllTime, name: 'All time' },
  { id: TimePeriodsEnum.Year, name: 'Year' },
  { id: TimePeriodsEnum.Month, name: 'Month' },
  { id: TimePeriodsEnum.Day, name: 'Day' },
]

export const currentTimePeriod = signal<TimePeriodsEnum>(
  TimePeriodsEnum.AllTime
)
