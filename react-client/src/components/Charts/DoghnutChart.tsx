'use client'

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { ChartPieIcon } from '@heroicons/react/24/outline'

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DoughnutChart({
  labels,
  data,
  noDataMsg,
  isLoading,
  isEmpty
}: {
  labels: string[]
  data: number[]
  noDataMsg: string
  isLoading: boolean
  isEmpty: boolean
}) {
  const ChartData = {
    labels,
    datasets: [
      {
        label: 'Visits',
        data,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }
  if (isLoading) {
    return (
      <div className="h-full w-full animate-pulse bg-white dark:bg-[#23212e]" />
    )
  }
  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center text-gray-400 dark:text-gray-600">
        <ChartPieIcon className="h-28 w-28 rotate-45 stroke-[0.4]" />
        <p className="text-xl">{noDataMsg}</p>
      </div>
    )
  }
  return <Doughnut data={ChartData} />
}
