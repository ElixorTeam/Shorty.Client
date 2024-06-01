export type Statistics = {
  views: number
  uniqueViews: number
}

export type AnalyticsItem = {
  label: string
  value: number
}

export type DevicesData = {
  os: AnalyticsItem[]
  device: AnalyticsItem[]
}

export type AnalyticsType = {
  statistics: Statistics
  devicesData: DevicesData
  viewsData: AnalyticsItem[]
}
