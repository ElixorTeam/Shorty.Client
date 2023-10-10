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
import { useRef } from 'react'
import { Line } from 'react-chartjs-2'

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

export default function WeekLineChart() {
  const chartRef = useRef<ChartJS>(null)
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }
  const labels = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ]
  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
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

  const data = {
    labels,
    datasets: [
      {
        fill: 'start',
        label: 'First dataset',
        data: labels.map(() => getRandomInt(1000)),
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const { ctx } = context.chart
          const gradient = ctx.createLinearGradient(0, 0, 0, 200)
          gradient.addColorStop(0, 'rgb(100,181,255)')
          gradient.addColorStop(1, 'rgba(110,168,255,0)')
          return gradient
        },
        borderColor: '#29a0f5',
        cubicInterpolationMode: 'monotone' as const,
      },
    ],
  }

  // @ts-ignore
  return <Line className="grow" ref={chartRef} data={data} options={options} />
}
