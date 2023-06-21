'use client'

import { useEffect, useRef } from 'react'
import Chart from 'chart.js/auto'

export default function ViewsLineChart({
  data,
  labels
}: {
  data: number[]
  labels: string[]
}) {
  const chartContainer = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const chart = new Chart(chartContainer.current, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Views',
              data,
              fill: false,
              borderColor: 'rgba(75,192,192,1)',
              cubicInterpolationMode: 'monotone'
            }
          ]
        }
      })

      return () => {
        chart.destroy()
      }
    }
    return undefined
  }, [chartContainer, data, labels])

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  )
}
