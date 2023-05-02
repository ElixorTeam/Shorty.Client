import Chart from 'chart.js/auto'
import { useEffect, useRef } from 'react'

interface BrowserUsage {
  label: string
  value: number
}

export default function BrowserDoughnutChart({
  data
}: {
  data: BrowserUsage[]
}) {
  const chartContainer = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const chart = new Chart(chartContainer.current, {
        type: 'doughnut',
        data: {
          labels: data.map(d => d.label),
          datasets: [
            {
              data: data.map(d => d.value),
              backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                '#C7B42C',
                '#17A9A8'
              ]
            }
          ]
        },
        options: {
          maintainAspectRatio: false,
          responsive: true
        }
      })

      return () => {
        chart.destroy()
      }
    }
    return () => {}
  }, [data])

  return <canvas ref={chartContainer} />
}
