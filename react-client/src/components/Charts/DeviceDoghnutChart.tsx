'use client'

import { useAppSelector } from '@/redux/hooks'
import { useGetLinkAnalyticsQuery } from '@/redux/Api/analyzeApi'
import DoughnutChart from '@/components/Charts/DoghnutChart'

export default function OsDoughnutChart() {
  const selectedLink = useAppSelector(state => state.selectedLink.selected)
  const { data, isLoading } = useGetLinkAnalyticsQuery(selectedLink.uid)
  const labels = data ? data.devices.map(item => item.name) : []
  const values = data ? data.devices.map(item => item.value) : []
  return (
    <DoughnutChart
      labels={labels}
      data={values}
      isLoading={isLoading}
      isEmpty={data?.browsers.length === 0}
    />
  )
}
