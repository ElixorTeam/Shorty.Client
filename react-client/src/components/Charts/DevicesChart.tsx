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

export default function DevicesChart() {
  function getRandomInt(max: number) {
    return Math.floor(Math.random() * max)
  }
  const labels = ['IPhone', 'Android', 'MacOS', 'Linux']
  const data = {
    labels,
    datasets: [
      {
        label: 'First dataset',
        data: labels.map(() => getRandomInt(100)),
        backgroundColor: 'rgb(79,182,255)',
        borderColor: 'rgba(76,163,255,0.13)',
        borderRadius: 5,
        maxBarThickness: 20,
        cubicInterpolationMode: 'monotone' as const,
      },
    ],
  }
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
  // @ts-ignore
  return <Bar data={data} className="grow" options={options} />
}
