'use client'

import {
  BarElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
  CategoryScale,
  LinearScale,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default function BarChart({ data }: { data: Record<string, number> }) {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        label: '',
        data: Object.values(data),
        backgroundColor: 'rgb(79,182,255)',
        borderColor: 'rgba(76,163,255,0.13)',
        borderRadius: 5,
        maxBarThickness: 20,
        cubicInterpolationMode: 'monotone' as const,
      },
    ],
  }

  const options: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        type: 'category',
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
        border: {
          dash: [2, 4],
          display: false,
        },
        ticks: {
          maxTicksLimit: 5,
        },
      },
    },
  }

  return <Bar data={chartData} className="grow" options={options} />
}
