'use client'

import { useAppSelector } from '@/redux/hooks'
import { useGetLinkAnalyticsQuery } from '@/redux/Api/analyzeApi'
import DoughnutChart from '@/components/Charts/DoghnutChart'

export default function OsDoughnutChart({ noDataMsg }: { noDataMsg: string }) {
  const selectedLink = useAppSelector((state) => state.selectedLink.selected)
  const { data, isLoading, isError } = useGetLinkAnalyticsQuery(
    selectedLink.uid
  )
  const labels = data ? data.devices.map((item) => item.name) : []
  const values = data ? data.devices.map((item) => item.value) : []
  return (
    <DoughnutChart
      labels={labels}
      data={values}
      noDataMsg={noDataMsg}
      isLoading={isLoading}
      isEmpty={data?.browsers.length === 0 || isError}
    />
  )
}
