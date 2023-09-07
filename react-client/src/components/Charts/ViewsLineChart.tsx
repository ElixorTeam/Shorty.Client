'use client'

import { Line } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { useAppSelector } from '@/redux/hooks'
import { useGetDayAnalyticsQuery } from '@/redux/Api/analyzeApi'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

export default function ViewsLineChart() {
  const selectedLink = useAppSelector((state) => state.selectedLink.selected)
  const { data, isLoading } = useGetDayAnalyticsQuery(selectedLink.uid)
  const labels = data ? data.map((item) => item.date) : []
  const values = data ? data.map((item) => item.count) : []
  const chartData = {
    labels,
    datasets: [
      {
        label: 'Views',
        data: values,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        cubicInterpolationMode: 'monotone',
      },
    ],
  }
  if (isLoading) return null
  // @ts-ignore
  return <Line data={chartData} />
}
