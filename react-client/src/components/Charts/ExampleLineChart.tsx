'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ScriptableContext,
  ChartOptions,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

import getRandomInt from '@/utils/getRandomInt'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

export default function ExampleLineChart() {
  const labels = Array(7).fill('')
  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
  }

  const data = {
    labels,
    datasets: [
      {
        fill: 'start',
        label: '',
        data: labels.map(() => getRandomInt(1000)),
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const { ctx } = context.chart
          const gradient = ctx.createLinearGradient(0, 0, 0, 200)
          gradient.addColorStop(0, 'rgba(100,181,255,0.5)')
          gradient.addColorStop(1, 'rgba(110,168,255,0)')
          return gradient
        },
        borderColor: '#29a0f5',
        cubicInterpolationMode: 'monotone' as const,
      },
    ],
  }

  return <Line className="grow" data={data} options={options} />
}
