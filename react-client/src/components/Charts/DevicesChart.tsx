import {
  BarElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(BarElement, Tooltip, Legend)

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
        backgroundColor: 'rgba(0, 0, 0, 0.9)',
        borderColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: 10,
        maxBarThickness: 80,
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
  return <Bar data={data} className="grow" options={options} />
}
